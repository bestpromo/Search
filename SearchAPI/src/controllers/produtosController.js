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

  res.json({ 
    termo, 
    options: { fetchPermalinks },
    resultados: produtos 
  });
};
