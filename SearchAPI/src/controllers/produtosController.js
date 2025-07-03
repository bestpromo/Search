const amazonService = require('../services/amazon'); // Serviço real corrigido
const shopeeService = require('../services/shopee');
const logger = require('../utils/logger');

// Placeholder para futuros serviços
async function placeholderService(termo) {
  return [];
}

exports.buscarProdutos = async (req, res) => {
  const { termo = '' } = req.query;
  
  if (!termo) {
    return res.status(400).json({ error: 'Termo de busca é obrigatório' });
  }

  // Log da busca com informações do usuário (se autenticado)
  const logInfo = {
    termo,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  };

  if (req.user) {
    logInfo.userId = req.user.id;
    logInfo.userEmail = req.user.email;
    logInfo.authenticated = true;
  } else {
    logInfo.authenticated = false;
  }

  logger.info('Busca de produtos iniciada', logInfo);

  // Opções de busca - fetchPermalinks para Mercado Livre
  const fetchPermalinks = req.query.fetchPermalinks === 'true';
  const options = { fetchPermalinks };

  // Consultas em paralelo
  const promises = [
    amazonService.buscarProdutos(termo),
    shopeeService.buscarProdutos(termo),
    placeholderService(termo)
  ];

  const resultados = await Promise.allSettled(promises);

  // Agrega apenas os fulfilled
  const produtos = resultados
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value);

  logger.info('Busca de produtos finalizada', { 
    ...logInfo,
    totalProdutos: produtos.length 
  });

  res.json({ 
    termo, 
    options: { fetchPermalinks },
    resultados: produtos,
    ...(req.user && { usuario: req.user.name }) // Inclui nome do usuário se autenticado
  });
};
