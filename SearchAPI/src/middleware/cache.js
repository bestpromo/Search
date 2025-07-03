const redisService = require('../utils/redis');
const logger = require('../utils/logger');

/**
 * Middleware para verificar cache antes de executar o controller
 */
function checkCache(req, res, next) {
  // Só usar cache se Redis estiver disponível
  if (!redisService.isReady()) {
    logger.warn('Redis not ready, skipping cache');
    res.set('X-Cache', 'DISABLED');
    return next();
  }

  // Gerar chave única do cache baseada na consulta e usuário
  const cacheKey = generateCacheKey(req);
  req.cacheKey = cacheKey;
  
  // Tentar obter dados do cache
  redisService.get(cacheKey)
    .then(cachedData => {
      if (cachedData) {
        logger.info('Cache hit - returning cached data', { 
          cacheKey, 
          userId: req.user?.id,
          termo: req.query.termo
        });
        
        // Adicionar nome do usuário se autenticado
        if (req.user) {
          cachedData.usuario = req.user.name;
        }
        
        // Adicionar headers de cache
        res.set({
          'X-Cache': 'HIT',
          'X-Cache-Key': cacheKey
        });
        
        return res.json(cachedData);
      }
      
      // Cache miss - continuar para o controller
      logger.info('Cache miss - proceeding to controller', { 
        cacheKey, 
        userId: req.user?.id,
        termo: req.query.termo
      });
      
      res.set('X-Cache', 'MISS');
      next();
    })
    .catch(error => {
      logger.error('Cache check error', { 
        cacheKey, 
        error: error.message 
      });
      
      // Em caso de erro no cache, continuar sem cache
      res.set('X-Cache', 'ERROR');
      next();
    });
}

/**
 * Middleware para salvar resposta no cache após execução do controller
 */
function saveToCache(req, res, next) {
  // Interceptar o método json() para salvar no cache
  const originalJson = res.json;
  
  res.json = function(data) {
    // Salvar no cache apenas se foi um sucesso e Redis estiver disponível
    if (res.statusCode === 200 && req.cacheKey && redisService.isReady()) {
      // Criar uma cópia dos dados sem informações do usuário para o cache
      const cacheData = {
        termo: data.termo,
        options: data.options,
        resultados: data.resultados
        // Não incluir 'usuario' no cache
      };

      redisService.set(req.cacheKey, cacheData)
        .then(success => {
          if (success) {
            logger.info('Data saved to cache', { 
              cacheKey: req.cacheKey,
              userId: req.user?.id,
              termo: req.query.termo
            });
          }
        })
        .catch(error => {
          logger.error('Cache save error', { 
            cacheKey: req.cacheKey,
            error: error.message 
          });
        });
    }
    
    // Chamar o método original
    return originalJson.call(this, data);
  };
  
  next();
}

/**
 * Middleware combinado que verifica cache e salva automaticamente
 */
function cacheMiddleware(req, res, next) {
  // Só usar cache se Redis estiver disponível
  if (!redisService.isReady()) {
    logger.warn('Redis not ready, skipping cache');
    res.set('X-Cache', 'DISABLED');
    return next();
  }
  
  // Aplicar ambos os middlewares
  checkCache(req, res, (err) => {
    if (err) return next(err);
    saveToCache(req, res, next);
  });
}

/**
 * Gera chave única do cache baseada na requisição
 */
function generateCacheKey(req) {
  const { termo, fetchPermalinks } = req.query;
  
  if (!termo) {
    return null;
  }
  
  // Normalizar termo para cache (lowercase, trim, etc.)
  const normalizedTerm = termo.toLowerCase().trim().replace(/\s+/g, '-');
  
  // Criar chave única baseada nos parâmetros (não incluir usuário para compartilhar cache)
  const keyParts = [
    'produtos',
    normalizedTerm,
    fetchPermalinks === 'true' ? 'with-permalinks' : 'no-permalinks'
  ];
  
  return redisService.generateKey(...keyParts);
}

module.exports = {
  checkCache,
  saveToCache,
  cacheMiddleware,
  generateCacheKey
};
