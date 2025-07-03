const logRotator = require('../utils/logRotator');
const logger = require('../utils/logger');

/**
 * Obter estatísticas dos logs
 */
async function getLogStats(req, res) {
  try {
    const stats = logRotator.getStats();
    
    logger.info('Estatísticas dos logs consultadas', { 
      adminId: req.user.id 
    });

    res.json({
      message: 'Estatísticas dos logs',
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Erro ao obter estatísticas dos logs', { 
      error: error.message,
      adminId: req.user.id 
    });
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
}

/**
 * Forçar rotação de logs
 */
async function forceLogRotation(req, res) {
  try {
    await logRotator.checkAndRotate();
    
    logger.info('Rotação de logs forçada', { 
      adminId: req.user.id 
    });

    res.json({
      message: 'Rotação de logs executada com sucesso',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Erro ao forçar rotação de logs', { 
      error: error.message,
      adminId: req.user.id 
    });
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
}

/**
 * Configurar parâmetros de rotação
 */
async function updateLogConfig(req, res) {
  try {
    const { maxSizeMB, maxDays, rotationEnabled } = req.body;
    
    // Validar parâmetros
    if (maxSizeMB && (maxSizeMB < 1 || maxSizeMB > 1000)) {
      return res.status(400).json({
        error: 'Tamanho máximo deve estar entre 1 e 1000 MB'
      });
    }
    
    if (maxDays && (maxDays < 1 || maxDays > 365)) {
      return res.status(400).json({
        error: 'Dias máximos devem estar entre 1 e 365'
      });
    }
    
    // Atualizar configurações (em produção, isso deveria atualizar .env)
    if (maxSizeMB) {
      process.env.LOG_MAX_SIZE_MB = maxSizeMB.toString();
      logRotator.maxSizeMB = maxSizeMB;
    }
    
    if (maxDays) {
      process.env.LOG_MAX_DAYS = maxDays.toString();
      logRotator.maxDays = maxDays;
    }
    
    if (rotationEnabled !== undefined) {
      process.env.LOG_ROTATION_ENABLED = rotationEnabled.toString();
      logRotator.rotationEnabled = rotationEnabled;
    }
    
    logger.info('Configuração de logs atualizada', { 
      adminId: req.user.id,
      maxSizeMB,
      maxDays,
      rotationEnabled
    });

    res.json({
      message: 'Configuração de logs atualizada com sucesso',
      config: {
        maxSizeMB: logRotator.maxSizeMB,
        maxDays: logRotator.maxDays,
        rotationEnabled: logRotator.rotationEnabled
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Erro ao atualizar configuração de logs', { 
      error: error.message,
      adminId: req.user.id 
    });
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
}

module.exports = {
  getLogStats,
  forceLogRotation,
  updateLogConfig
};
