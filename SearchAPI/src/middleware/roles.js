const logger = require('../utils/logger');

/**
 * Middleware para verificar se o usuário é administrador
 */
function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Token de acesso obrigatório'
    });
  }

  if (req.user.role !== 'admin') {
    logger.warn('Acesso negado - usuário não é admin', { 
      userId: req.user.id,
      userRole: req.user.role,
      path: req.path 
    });
    
    return res.status(403).json({
      error: 'Acesso negado',
      message: 'Apenas administradores podem acessar este recurso'
    });
  }

  next();
}

/**
 * Middleware para verificar se o usuário é dono do recurso ou administrador
 */
function requireOwnerOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Token de acesso obrigatório'
    });
  }

  const resourceUserId = parseInt(req.params.userId);
  const isOwner = req.user.id === resourceUserId;
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    logger.warn('Acesso negado - não é dono nem admin', { 
      userId: req.user.id,
      resourceUserId,
      userRole: req.user.role,
      path: req.path 
    });
    
    return res.status(403).json({
      error: 'Acesso negado',
      message: 'Você só pode acessar seus próprios recursos'
    });
  }

  next();
}

module.exports = {
  requireAdmin,
  requireOwnerOrAdmin
};
