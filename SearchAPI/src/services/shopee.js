const { SaAPI, Country } = require('../lib/saapi-js');
require('dotenv').config();
const logger = require('../utils/logger');

const SHOPEE_APPID = process.env.SHOPEE_APPID;
const SHOPEE_SECRET = process.env.SHOPEE_SECRET;
const SHOPEE_COUNTRY = process.env.SHOPEE_COUNTRY || Country.BRAZIL;

const saapi = new SaAPI({
  appId: SHOPEE_APPID,
  secret: SHOPEE_SECRET,
  country: SHOPEE_COUNTRY
});

// Função para buscar produtos na Shopee Affiliate API
exports.buscarProdutos = async (termo) => {
  try {
    logger.info('Shopee request', { termo });
    
    // Usar productOfferV2 que tem mais campos disponíveis incluindo preço
    const params = { 
      keyword: termo, 
      limit: 20,  // Retornando 20 produtos
      page: 1 
    };
    
    // Campos válidos para productOfferV2 - usando apenas os campos essenciais
    const resParams = {
      nodes: [
        'itemId',
        'productName', 
        'imageUrl', 
        'offerLink',
        'priceMin',
        'priceMax'
      ],
      pageInfo: ['page', 'limit', 'hasNextPage']
    };
    
    // Usar productOfferV2 que tem campos de preço
    const result = await saapi.queries.productOfferV2(params, resParams);
    logger.info('Shopee response', { data: result });
    
    const items = result.nodes || [];
    return items.map(item => {
      // Formatar preços - usar priceMin como preço atual e priceMax como possível "de"
      let precoPor = null;      // Preço atual (menor preço)
      let precoDe = null;       // Preço máximo (se diferente do mínimo)
      
      if (item.priceMin) {
        const precoMinimo = parseFloat(item.priceMin);
        precoPor = `R$ ${precoMinimo.toFixed(2).replace('.', ',')}`;
      }
      
      // Se há diferença entre priceMax e priceMin, usar priceMax como "de"
      if (item.priceMax && item.priceMin) {
        const maximo = parseFloat(item.priceMax);
        const minimo = parseFloat(item.priceMin);
        if (maximo > minimo) {
          precoDe = `R$ ${maximo.toFixed(2).replace('.', ',')}`;
        }
      }
      
      // Calcular desconto baseado na diferença entre max e min
      let desconto = null;
      if (item.priceMax && item.priceMin) {
        const maximo = parseFloat(item.priceMax);
        const minimo = parseFloat(item.priceMin);
        if (maximo > minimo) {
          const percentual = ((maximo - minimo) / maximo * 100).toFixed(0);
          desconto = `${percentual}%`;
        }
      }
      
      return {
        fonte: 'shopee',
        fonteOriginal: 'Shopee',
        id: item.itemId || '',
        nome: item.productName || '',
        
        // Preços padronizados
        preco: precoPor,           // Preço atual ("por") - sempre o menor
        precoDe: precoDe,          // Preço máximo ("de") se houver diferença
        precoPor: precoPor,        // Preço atual (duplicado para compatibilidade)
        desconto: desconto,        // Percentual de desconto
        
        imagem: item.imageUrl || '',
        link: item.offerLink || '',
        avaliacao: null,
        totalAvaliacoes: null,
        categoria: '',
        categoriaId: '',
        marca: '',
        // Informações da loja (campos básicos)
        loja: {
          nome: '',
          id: '',
          oficial: false,
          avaliacao: null,
          localizacao: ''
        },
        // Informações do produto
        vendidos: 0,
        estoque: null,
        temVariacao: false,
        moeda: 'BRL',
        comissao: null,
        // Campos extras calculados
        popular: false,
        bemAvaliado: false,
        temDesconto: !!desconto && desconto !== '0%',
        economia: precoDe && precoPor ? `Economize ${desconto}` : null
      };
    });
  } catch (err) {
    logger.error('Erro Shopee', { message: err.message, stack: err.stack });
    return [];
  }
};
