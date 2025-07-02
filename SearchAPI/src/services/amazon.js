const ProductAdvertisingAPIv1 = require('../lib/amazonsdk/src/index');
const logger = require('../utils/logger');
require('dotenv').config();

const AMAZON_ACCESS_KEY = process.env.AMAZON_ACCESS_KEY;
const AMAZON_SECRET_KEY = process.env.AMAZON_SECRET_KEY;
const AMAZON_ASSOCIATE_TAG = process.env.AMAZON_ASSOCIATE_TAG || '';

exports.buscarProdutos = async (termo) => {
  try {
    if (!AMAZON_ASSOCIATE_TAG) {
      logger.error('AMAZON_ASSOCIATE_TAG não definido no .env');
      return [];
    }
    
    logger.info('Amazon BR request', { termo });
    
    // Configurar o cliente do SDK
    const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
    defaultClient.accessKey = AMAZON_ACCESS_KEY;
    defaultClient.secretKey = AMAZON_SECRET_KEY;
    defaultClient.host = 'webservices.amazon.com.br'; // Para o Brasil
    defaultClient.region = 'us-east-1';
    
    const api = new ProductAdvertisingAPIv1.DefaultApi();
    
    // Criar a request
    const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
    searchItemsRequest['PartnerTag'] = AMAZON_ASSOCIATE_TAG;
    searchItemsRequest['PartnerType'] = 'Associates';
    searchItemsRequest['Keywords'] = termo;
    searchItemsRequest['SearchIndex'] = 'All';
    searchItemsRequest['ItemCount'] = 20; // Retornar 20 produtos
    
    // Resources básicos e válidos - adicionando imagens
    searchItemsRequest['Resources'] = [
      'ItemInfo.Title',
      'Offers.Listings.Price',
      'Images.Primary.Large',
      'Images.Primary.Medium'
    ];
    
    logger.info('Amazon BR request sent', { termo, itemCount: 20 });
    
    // Fazer a chamada da API usando o SDK
    const data = await api.searchItems(searchItemsRequest);
    
    logger.info('Amazon BR response received', { 
      status: 'success',
      itemCount: data.SearchResult?.Items?.length || 0 
    });
    
    const searchItemsResponse = ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);
    
    // Verificar se há erros
    if (searchItemsResponse.Errors !== undefined) {
      logger.error('Amazon API Errors', { 
        errors: searchItemsResponse.Errors.map(e => ({ 
          code: e.Code, 
          message: e.Message 
        }))
      });
      return [];
    }
    
    const items = searchItemsResponse.SearchResult?.Items || [];
    
    const produtos = items.map(item => {
      // Extrair preço
      let preco = null;
      if (item.Offers?.Listings?.[0]?.Price?.DisplayAmount) {
        preco = item.Offers.Listings[0].Price.DisplayAmount;
      } else if (item.Offers?.Listings?.[0]?.Price?.Amount) {
        const valor = parseFloat(item.Offers.Listings[0].Price.Amount);
        preco = `R$ ${valor.toFixed(2).replace('.', ',')}`;
      }
      
      // Extrair imagem
      let imagem = '';
      if (item.Images?.Primary?.Large?.URL) {
        imagem = item.Images.Primary.Large.URL;
      } else if (item.Images?.Primary?.Medium?.URL) {
        imagem = item.Images.Primary.Medium.URL;
      } else if (item.Images?.Primary?.Small?.URL) {
        imagem = item.Images.Primary.Small.URL;
      }
      
      // Link real da Amazon - AGORA usando DetailPageURL da API!
      let link = item.DetailPageURL || '';
      
      return {
        fonte: 'amazon',
        fonteOriginal: 'Amazon',
        id: item.ASIN || '',
        nome: item.ItemInfo?.Title?.DisplayValue || '',
        preco: preco,
        imagem: imagem,
        link: link, // Link real da API, não mais hardcoded!
        marca: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || '',
        // Campos básicos para compatibilidade
        precoDe: null,
        precoPor: preco,
        desconto: null,
        avaliacao: null,
        totalAvaliacoes: null
      };
    });
    
    logger.info('Amazon produtos processados', { 
      count: produtos.length,
      comPreco: produtos.filter(p => p.preco).length,
      comImagem: produtos.filter(p => p.imagem).length,
      comLink: produtos.filter(p => p.link).length,
      comLinkReal: produtos.filter(p => p.link && p.link.includes('amazon.com')).length
    });
    
    return produtos;
    
  } catch (err) {
    logger.error('Erro Amazon BR', { 
      message: err.message,
      status: err.status,
      response: err.response?.text,
      termo 
    });
    return [];
  }
};
