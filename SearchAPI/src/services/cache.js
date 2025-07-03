const redis = require('redis');
const logger = require('../utils/logger');

class CacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.defaultTTL = parseInt(process.env.CACHE_TTL) || 300; // 5 minutos padrão
  }

  /**
   * Inicializa a conexão com Redis
   */
  async init() {
    try {
      const redisConfig = {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        db: parseInt(process.env.REDIS_DB) || 0,
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        }
      };

      // Adicionar senha se fornecida
      if (process.env.REDIS_PASSWORD) {
        redisConfig.password = process.env.REDIS_PASSWORD;
      }

      this.client = redis.createClient(redisConfig);

      // Event listeners
      this.client.on('connect', () => {
        logger.info('Redis conectado com sucesso');
        this.isConnected = true;
      });

      this.client.on('error', (err) => {
        logger.error('Erro no Redis', { error: err.message });
        this.isConnected = false;
      });

      this.client.on('end', () => {
        logger.warn('Conexão Redis encerrada');
        this.isConnected = false;
      });

      this.client.on('reconnecting', () => {
        logger.info('Reconectando ao Redis...');
      });

      // Conectar
      await this.client.connect();
      
      logger.info('Cache Redis inicializado', {
        host: redisConfig.host,
        port: redisConfig.port,
        db: redisConfig.db,
        defaultTTL: this.defaultTTL
      });

    } catch (error) {
      logger.error('Erro ao inicializar Redis', { error: error.message });
      this.isConnected = false;
    }
  }

  /**
   * Verifica se o Redis está conectado
   */
  isReady() {
    return this.isConnected && this.client && this.client.isOpen;
  }

  /**
   * Gera chave do cache com prefixo
   */
  generateKey(prefix, ...parts) {
    return `bestpromo:${prefix}:${parts.join(':')}`;
  }

  /**
   * Obter valor do cache
   */
  async get(key) {
    if (!this.isReady()) {
      logger.warn('Redis não está conectado - cache ignorado');
      return null;
    }

    try {
      const value = await this.client.get(key);
      
      if (value) {
        logger.info('Cache hit', { key });
        return JSON.parse(value);
      }
      
      logger.info('Cache miss', { key });
      return null;
    } catch (error) {
      logger.error('Erro ao obter cache', { key, error: error.message });
      return null;
    }
  }

  /**
   * Definir valor no cache
   */
  async set(key, value, ttl = null) {
    if (!this.isReady()) {
      logger.warn('Redis não está conectado - cache ignorado');
      return false;
    }

    try {
      const serializedValue = JSON.stringify(value);
      const expiration = ttl || this.defaultTTL;

      await this.client.setEx(key, expiration, serializedValue);
      
      logger.info('Cache set', { key, ttl: expiration });
      return true;
    } catch (error) {
      logger.error('Erro ao definir cache', { key, error: error.message });
      return false;
    }
  }

  /**
   * Deletar valor do cache
   */
  async del(key) {
    if (!this.isReady()) {
      return false;
    }

    try {
      const result = await this.client.del(key);
      logger.info('Cache deleted', { key, deleted: result > 0 });
      return result > 0;
    } catch (error) {
      logger.error('Erro ao deletar cache', { key, error: error.message });
      return false;
    }
  }

  /**
   * Limpar cache com padrão
   */
  async clear(pattern = '*') {
    if (!this.isReady()) {
      return false;
    }

    try {
      const keys = await this.client.keys(pattern);
      
      if (keys.length > 0) {
        await this.client.del(keys);
        logger.info('Cache cleared', { pattern, keysDeleted: keys.length });
      }
      
      return true;
    } catch (error) {
      logger.error('Erro ao limpar cache', { pattern, error: error.message });
      return false;
    }
  }

  /**
   * Obter estatísticas do cache
   */
  async getStats() {
    if (!this.isReady()) {
      return null;
    }

    try {
      const info = await this.client.info('memory');
      const keyspace = await this.client.info('keyspace');
      
      return {
        connected: this.isConnected,
        memory: info,
        keyspace: keyspace
      };
    } catch (error) {
      logger.error('Erro ao obter estatísticas do cache', { error: error.message });
      return null;
    }
  }

  /**
   * Fechar conexão
   */
  async close() {
    if (this.client && this.client.isOpen) {
      await this.client.quit();
      logger.info('Conexão Redis fechada');
    }
  }
}

// Singleton instance
const cacheService = new CacheService();

module.exports = cacheService;
