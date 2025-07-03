const redis = require('redis');
const logger = require('./logger');

class RedisService {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      this.client = redis.createClient({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        db: process.env.REDIS_DB || 0,
        retry_strategy: (options) => {
          if (options.error && options.error.code === 'ECONNREFUSED') {
            logger.error('Redis connection refused');
            return new Error('Redis server connection refused');
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
            logger.error('Redis retry time exhausted');
            return new Error('Redis retry time exhausted');
          }
          if (options.attempt > 10) {
            logger.error('Redis connection attempts exhausted');
            return undefined;
          }
          // Reconnect after
          return Math.min(options.attempt * 100, 3000);
        }
      });

      this.client.on('connect', () => {
        logger.info('Redis client connected');
        this.isConnected = true;
      });

      this.client.on('error', (err) => {
        logger.error('Redis client error', { error: err.message });
        this.isConnected = false;
      });

      this.client.on('end', () => {
        logger.info('Redis client disconnected');
        this.isConnected = false;
      });

      await this.client.connect();
      logger.info('Redis connection established successfully');
      
    } catch (error) {
      logger.error('Failed to connect to Redis', { error: error.message });
      this.isConnected = false;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.disconnect();
      logger.info('Redis disconnected');
    }
  }

  isReady() {
    return this.isConnected && this.client && this.client.isReady;
  }

  async get(key) {
    if (!this.isReady()) {
      logger.warn('Redis not ready, skipping get operation');
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
      logger.error('Redis get error', { key, error: error.message });
      return null;
    }
  }

  async set(key, value, ttl = null) {
    if (!this.isReady()) {
      logger.warn('Redis not ready, skipping set operation');
      return false;
    }

    try {
      const stringValue = JSON.stringify(value);
      const cacheTtl = ttl || parseInt(process.env.CACHE_TTL) || 300;
      
      await this.client.setEx(key, cacheTtl, stringValue);
      logger.info('Cache set', { key, ttl: cacheTtl });
      return true;
    } catch (error) {
      logger.error('Redis set error', { key, error: error.message });
      return false;
    }
  }

  async del(key) {
    if (!this.isReady()) {
      logger.warn('Redis not ready, skipping delete operation');
      return false;
    }

    try {
      const result = await this.client.del(key);
      logger.info('Cache deleted', { key, deleted: result });
      return result > 0;
    } catch (error) {
      logger.error('Redis delete error', { key, error: error.message });
      return false;
    }
  }

  async exists(key) {
    if (!this.isReady()) {
      return false;
    }

    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      logger.error('Redis exists error', { key, error: error.message });
      return false;
    }
  }

  async flushPattern(pattern) {
    if (!this.isReady()) {
      logger.warn('Redis not ready, skipping flush pattern operation');
      return false;
    }

    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
        logger.info('Cache pattern flushed', { pattern, keysDeleted: keys.length });
        return keys.length;
      }
      return 0;
    } catch (error) {
      logger.error('Redis flush pattern error', { pattern, error: error.message });
      return false;
    }
  }

  async flushAll() {
    if (!this.isReady()) {
      logger.warn('Redis not ready, skipping flush all operation');
      return false;
    }

    try {
      await this.client.flushAll();
      logger.info('All cache flushed');
      return true;
    } catch (error) {
      logger.error('Redis flush all error', { error: error.message });
      return false;
    }
  }

  async getStats() {
    if (!this.isReady()) {
      return { connected: false, error: 'Redis not ready' };
    }

    try {
      const info = await this.client.info('memory');
      const keys = await this.client.dbSize();
      
      return {
        connected: true,
        totalKeys: keys,
        memoryInfo: info,
        isReady: this.isReady()
      };
    } catch (error) {
      logger.error('Redis stats error', { error: error.message });
      return { connected: false, error: error.message };
    }
  }

  generateKey(prefix, ...parts) {
    return [prefix, ...parts].join(':');
  }
}

module.exports = new RedisService();
