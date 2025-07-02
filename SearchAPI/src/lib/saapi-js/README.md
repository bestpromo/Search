# SaAPI-JS
> ⚠️ **Este pacote não é oficial.**

Um simples wrapper para a API de afiliados da Shopee em JavaScript/TypeScript.

```typescript
import { SaAPI } from 'saapi-js';

const client = new SaAPI({
  appId: "seu_app_id",
  secret: "seu_secret"
});

const res = await client.queries.productOfferV2(
  { keyword: "tênis" },
  { nodes: ["itemId", "productName"] }
);

console.log(res);
// { "nodes": [
//    {'itemId': 22093519050, 'productName': 'Tênis Sapatênis Polo Masculino'},
//    ...
//   ]
// }
```

Todas as queries e mutations que não estão depreciados foram implementados, os 
campos que foram depreciados não foram implementados.

## Instalação
```console
$ npm install saapi-js
```
Versão mínima do Node.js 16.0.

## Uso com TypeScript
Todas as operações possuem tipos para facilitar o uso e evitar erros, seja argumentos
ou campos de retorno.

```typescript
import { SaAPI } from 'saapi-js';
import { 
  ProductOfferV2Node, 
  ProductOfferV2SortType,
  PageInfoResParams 
} from 'saapi-js/dist/queries/productOfferV2';

const client = new SaAPI({
  appId: "seu_app_id",
  secret: "seu_secret"
});

const res = await client.queries.productOfferV2(
  {
    keyword: "tênis",
    sortType: ProductOfferV2SortType.COMMISSION_DESC,
    limit: 10
  },
  {
    nodes: [ProductOfferV2Node.itemId, ProductOfferV2Node.productName],
    pageInfo: [PageInfoResParams.hasNextPage]
  }
);
```

## Funcionalidades

### Queries
- `productOfferV2` - Buscar ofertas de produtos
- `shopOfferV2` - Buscar ofertas de lojas
- `shopeeOfferV2` - Buscar ofertas do Shopee
- `conversionReport` - Relatório de conversões
- `validatedReport` - Relatório validado

### Mutations
- `generateShortLink` - Gerar link curto

### Países Suportados
- Brasil (padrão)
- Indonésia
- Vietnã
- Malásia
- Tailândia
- Singapura
- Filipinas
- Taiwan

## Licença
MIT
