const { verifyToken } = require('../utils/jwt');
const logger = require('../utils/logger');

/**
 * Middleware de autenticação JWT
 * Verifica se o token é válido e adiciona os dados do usuário ao request
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    logger.warn('Token não fornecido', { 
      ip: req.ip, 
      userAgent: req.get('User-Agent'),
      path: req.path 
    });
    return res.status(401).json({ 
      error: 'Token de acesso obrigatório',
      message: 'Forneça um token Bearer válido no cabeçalho Authorization'
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    
    logger.info('Token válido', { 
      userId: decoded.id,
      email: decoded.email,
      path: req.path 
    });
    
    next();
  } catch (error) {
    logger.warn('Token inválido', { 
      error: error.message,
      ip: req.ip,
      path: req.path 
    });
    
    return res.status(403).json({ 
      error: 'Token inválido ou expirado',
      message: 'O token fornecido é inválido ou expirou'
    });
  }
}

/**
 * Middleware opcional de autenticação JWT
 * Se o token for fornecido, verifica se é válido
 * Se não for fornecido, continua sem autenticação
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    logger.info('Token válido (opcional)', { 
      userId: decoded.id,
      email: decoded.email,
      path: req.path 
    });
  } catch (error) {
    logger.warn('Token inválido (opcional)', { 
      error: error.message,
      path: req.path 
    });
    req.user = null;
  }

  next();
}

module.exports = {
  authenticateToken,
  optionalAuth
};
