const express = require('express');
const produtosController = require('./controllers/produtosController');
const authController = require('./controllers/authController');
const usersController = require('./controllers/usersController');
const cacheController = require('./controllers/cacheController');
const logController = require('./controllers/logController');
const { authenticateToken, optionalAuth } = require('./middleware/auth');
const { requireAdmin, requireOwnerOrAdmin } = require('./middleware/roles');
const { cacheMiddleware, checkCache, saveToCache } = require('./middleware/cache');

const router = express.Router();

// Rotas de autenticação (públicas)
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.post('/auth/refresh', authController.refreshToken);

// Rotas protegidas de autenticação
router.get('/auth/me', authenticateToken, authController.me);

// Rotas de usuários (admin only)
router.get('/users', authenticateToken, requireAdmin, usersController.listUsers);
router.get('/users/:userId', authenticateToken, requireOwnerOrAdmin, usersController.getUser);
router.patch('/users/:userId/role', authenticateToken, requireAdmin, usersController.updateUserRole);

// Rotas de produtos (com autenticação obrigatória e cache)
router.get('/produtos', 
  authenticateToken, 
  cacheMiddleware, 
  checkCache, 
  saveToCache, 
  produtosController.buscarProdutos
);

// Rotas de gerenciamento de cache (admin only)
router.get('/cache/stats', authenticateToken, requireAdmin, cacheController.getCacheStats);
router.post('/cache/clear/produtos', authenticateToken, requireAdmin, cacheController.clearProductsCache);
router.post('/cache/clear/all', authenticateToken, requireAdmin, cacheController.clearAllCache);
router.get('/cache/key/:key', authenticateToken, requireAdmin, cacheController.getCacheValue);
router.delete('/cache/key/:key', authenticateToken, requireAdmin, cacheController.deleteCacheKey);

// Rotas de gerenciamento de logs (admin only)
router.get('/logs/stats', authenticateToken, requireAdmin, logController.getLogStats);
router.post('/logs/rotate', authenticateToken, requireAdmin, logController.forceLogRotation);
router.patch('/logs/config', authenticateToken, requireAdmin, logController.updateLogConfig);

module.exports = router;
