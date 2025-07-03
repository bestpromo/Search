const redisService = require('../utils/redis');
const logger = require('../utils/logger');

/**
 * Obter estatísticas do cache
 */
async function getCacheStats(req, res) {
  try {
    const stats = await redisService.getStats();
    
    if (!stats.connected) {
      return res.status(503).json({
        error: 'Cache não disponível',
        message: 'Redis não está conectado'
      });
    }

    logger.info('Estatísticas do cache consultadas', { 
      adminId: req.user.id 
    });

    res.json({
      message: 'Estatísticas do cache',
      connected: redisService.isReady(),
      stats: stats,
      config: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        db: process.env.REDIS_DB || 0,
        defaultTTL: process.env.CACHE_TTL || 300
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Erro ao obter estatísticas do cache', { error: error.message });
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
}

/**
 * Limpar cache de produtos
 */
async function clearProductsCache(req, res) {
  try {
    const pattern = 'produtos:*';
    const deleted = await redisService.flushPattern(pattern);
    
    logger.info('Cache de produtos limpo', { 
      adminId: req.user.id,
      pattern: pattern,
      keysDeleted: deleted
    });

    res.json({
      message: 'Cache de produtos limpo com sucesso',
      pattern: pattern,
      keysDeleted: deleted,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Erro ao limpar cache de produtos', { error: error.message });
    res.status(500).json({
      error: 'Erro ao limpar cache de produtos',
      message: error.message
    });
  }
}

/**
 * Limpar todo o cache
 */
async function clearAllCache(req, res) {
  try {
    const success = await redisService.flushAll();
    
    if (success) {
      logger.info('Todo o cache foi limpo', { 
        adminId: req.user.id 
      });

      res.json({
        message: 'Todo o cache foi limpo com sucesso',
        timestamp: new Date().toISOString()
      });
    } else {
      throw new Error('Falha ao limpar cache');
    }
  } catch (error) {
    logger.error('Erro ao limpar todo o cache', { error: error.message });
    res.status(500).json({
      error: 'Erro ao limpar todo o cache',
      message: error.message
    });
  }
}

/**
 * Obter valor de uma chave específica
 */
async function getCacheValue(req, res) {
  try {
    const { key } = req.params;
    
    if (!key) {
      return res.status(400).json({
        error: 'Chave do cache é obrigatória'
      });
    }

    const value = await redisService.get(key);
    
    logger.info('Valor do cache consultado', { 
      adminId: req.user.id,
      key: key,
      found: value !== null
    });

    res.json({
      key: key,
      value: value,
      found: value !== null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Erro ao obter valor do cache', { 
      key: req.params.key,
      error: error.message 
    });
    res.status(500).json({
      error: 'Erro ao obter valor do cache',
      message: error.message
    });
  }
}

/**
 * Deletar chave específica do cache
 */
async function deleteCacheKey(req, res) {
  try {
    const { key } = req.params;
    
    if (!key) {
      return res.status(400).json({
        error: 'Chave do cache é obrigatória'
      });
    }

    const deleted = await redisService.del(key);
    
    logger.info('Chave do cache deletada', { 
      adminId: req.user.id,
      key: key,
      deleted: deleted
    });

    res.json({
      message: deleted ? 'Chave deletada com sucesso' : 'Chave não encontrada',
      key: key,
      deleted: deleted,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Erro ao deletar chave do cache', { 
      key: req.params.key,
      error: error.message 
    });
    res.status(500).json({
      error: 'Erro ao deletar chave do cache',
      message: error.message
    });
  }
}

module.exports = {
  getCacheStats,
  clearProductsCache,
  clearAllCache,
  getCacheValue,
  deleteCacheKey
};
