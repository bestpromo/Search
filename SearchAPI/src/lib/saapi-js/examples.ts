import { SaAPI, ProductOfferV2Node, ProductOfferV2SortType, PageInfoResParams } from './src/index';

// Exemplo básico de uso
async function exemploBasico() {
  const client = new SaAPI({
    appId: "seu_app_id",
    secret: "seu_secret"
  });

  try {
    const res = await client.queries.productOfferV2(
      { keyword: "tênis", limit: 5 },
      { nodes: [ProductOfferV2Node.itemId, ProductOfferV2Node.productName] }
    );
    
    console.log('Resultado:', res);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Exemplo com mais parâmetros
async function exemploAvancado() {
  const client = new SaAPI({
    appId: "seu_app_id",
    secret: "seu_secret"
  });

  try {
    const res = await client.queries.productOfferV2(
      {
        keyword: "smartphone",
        sortType: ProductOfferV2SortType.COMMISSION_DESC,
        page: 1,
        limit: 10
      },
      {
        nodes: [
          ProductOfferV2Node.itemId,
          ProductOfferV2Node.productName,
          ProductOfferV2Node.commission,
          ProductOfferV2Node.priceMin,
          ProductOfferV2Node.priceMax
        ],
        pageInfo: [PageInfoResParams.hasNextPage, PageInfoResParams.page]
      }
    );
    
    console.log('Produtos encontrados:', res.nodes?.length);
    console.log('Tem próxima página:', res.pageInfo?.hasNextPage);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Exemplo de geração de link curto
async function exemploLinkCurto() {
  const client = new SaAPI({
    appId: "seu_app_id",
    secret: "seu_secret"
  });

  try {
    const res = await client.mutations.generateShortLink(
      {
        input: {
          originUrl: "https://shopee.com.br/produto-example",
          subIds: ["campanha1", "fonte2"]
        }
      },
      ["shortLink"]
    );
    
    console.log('Link curto gerado:', res.shortLink);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Exemplo de relatório de conversão
async function exemploRelatorioConversao() {
  const client = new SaAPI({
    appId: "seu_app_id",
    secret: "seu_secret"
  });

  try {
    const res = await client.queries.conversionReport(
      {
        purchaseTimeStart: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60), // 30 dias atrás
        purchaseTimeEnd: Math.floor(Date.now() / 1000),
        limit: 50
      },
      {
        nodes: ["conversionId", "totalCommission", "purchaseTime"],
        pageInfo: ["hasNextPage", "scrollId"]
      }
    );
    
    console.log('Conversões encontradas:', res.nodes?.length);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Executar exemplos (descomente para testar)
// exemploBasico();
// exemploAvancado();
// exemploLinkCurto();
// exemploRelatorioConversao();
