const logger = require('./logger');

/**
 * Wrapper para Redis com fallback quando há problemas de instalação
 */
class RedisFallback {
  constructor() {
    this.client = null;
    this.ready = false;
    this.fallbackMode = false;
    this.initializeRedis();
  }

  async initializeRedis() {
    try {
      // Tentar importar Redis
      const redis = require('redis');
      
      this.client = redis.createClient({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        db: process.env.REDIS_DB || 0,
        retry_strategy: (options) => {
          if (options.error && options.error.code === 'ECONNREFUSED') {
            logger.error('Redis connection refused, switching to fallback mode');
            this.fallbackMode = true;
            return undefined;
          }
          return Math.min(options.attempt * 100, 3000);
        }
      });

      this.client.on('connect', () => {
        logger.info('Redis client connected');
        this.ready = true;
        this.fallbackMode = false;
      });

      this.client.on('error', (err) => {
        logger.error('Redis connection error:', err);
        this.ready = false;
        this.fallbackMode = true;
      });

      await this.client.connect();
      
    } catch (error) {
      logger.error('Redis initialization failed, running in fallback mode:', error.message);
      this.fallbackMode = true;
      this.ready = false;
    }
  }

  isReady() {
    return this.ready && !this.fallbackMode;
  }

  async get(key) {
    if (this.fallbackMode || !this.ready) {
      return null;
    }
    
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Redis GET error:', error);
      return null;
    }
  }

  async set(key, value, ttl = null) {
    if (this.fallbackMode || !this.ready) {
      return false;
    }
    
    try {
      const stringValue = JSON.stringify(value);
      if (ttl) {
        await this.client.setEx(key, ttl, stringValue);
      } else {
        await this.client.set(key, stringValue);
      }
      return true;
    } catch (error) {
      logger.error('Redis SET error:', error);
      return false;
    }
  }

  async del(key) {
    if (this.fallbackMode || !this.ready) {
      return 0;
    }
    
    try {
      return await this.client.del(key);
    } catch (error) {
      logger.error('Redis DEL error:', error);
      return 0;
    }
  }

  async keys(pattern) {
    if (this.fallbackMode || !this.ready) {
      return [];
    }
    
    try {
      return await this.client.keys(pattern);
    } catch (error) {
      logger.error('Redis KEYS error:', error);
      return [];
    }
  }

  async flushDb() {
    if (this.fallbackMode || !this.ready) {
      return false;
    }
    
    try {
      await this.client.flushDb();
      return true;
    } catch (error) {
      logger.error('Redis FLUSHDB error:', error);
      return false;
    }
  }

  async info() {
    if (this.fallbackMode || !this.ready) {
      return 'Redis running in fallback mode';
    }
    
    try {
      return await this.client.info('memory');
    } catch (error) {
      logger.error('Redis INFO error:', error);
      return 'Redis info unavailable';
    }
  }

  generateKey(...parts) {
    return parts.join(':');
  }

  async quit() {
    if (this.client && this.ready) {
      try {
        await this.client.quit();
        logger.info('Redis client disconnected');
      } catch (error) {
        logger.error('Error disconnecting Redis:', error);
      }
    }
  }
}

// Criar instância única
const redisService = new RedisFallback();

module.exports = redisService;
