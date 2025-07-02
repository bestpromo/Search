# Search API - Bestpromo

API de busca de produtos integrada com Amazon (Brasil) e Shopee.

## 🚀 Funcionalidades

- Busca de produtos na Amazon Brasil usando SDK oficial
- Busca de produtos na Shopee usando SDK saapi-js
- Retorna até 20 produtos de cada fonte
- Dados padronizados: nome, preço, imagem, link, marca
- Links reais das APIs (não hardcoded)
- Logs detalhados para monitoramento

## 📋 Estrutura do Projeto

```
src/
├── controllers/
│   └── produtosController.js    # Controller principal da API
├── services/
│   ├── amazon.js               # Serviço Amazon (SDK oficial)
│   └── shopee.js               # Serviço Shopee (saapi-js)
├── lib/
│   ├── amazonsdk/              # SDK oficial da Amazon
│   └── saapi-js/               # SDK do Shopee
├── utils/
│   └── logger.js               # Sistema de logs
├── routes.js                   # Definição das rotas
└── server.js                   # Servidor Express
```

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```bash
# Amazon
AMAZON_ASSOCIATE_TAG=seu-associate-tag
AMAZON_ACCESS_KEY=sua-access-key
AMAZON_SECRET_KEY=sua-secret-key

# Shopee
SHOPEE_APPID=seu-app-id
SHOPEE_SECRET=seu-secret
```

### Instalação

```bash
npm install
```

### Execução

```bash
# Produção
npm start

# Desenvolvimento (com nodemon)
npm run dev
```

## 🔗 API Endpoints

### GET /produtos?q={termo}

Busca produtos por termo de pesquisa.

**Exemplo:**
```bash
curl "http://localhost:3000/produtos?q=notebook"
```

**Resposta:**
```json
{
  "resultados": [
    {
      "fonte": "amazon",
      "fonteOriginal": "Amazon",
      "id": "B0ABC123",
      "nome": "Notebook Dell Inspiron",
      "preco": "R$ 2.599,00",
      "imagem": "https://m.media-amazon.com/images/...",
      "link": "https://www.amazon.com.br/dp/B0ABC123",
      "marca": "Dell"
    },
    {
      "fonte": "shopee",
      "fonteOriginal": "Shopee",
      "id": "12345678",
      "nome": "Notebook Acer Aspire",
      "preco": "R$ 2.399,00",
      "imagem": "https://cf.shopee.com.br/file/...",
      "link": "https://shopee.com.br/product/...",
      "marca": "Acer"
    }
  ],
  "total": 40,
  "amazon": 20,
  "shopee": 20
}
```

## 📊 Logs

Os logs são salvos em:
- `logs/combined.log` - Todos os logs
- `logs/error.log` - Apenas erros

## 🛠️ Tecnologias

- **Node.js** + **Express** - Backend
- **Amazon PA-API 5.0** - SDK oficial da Amazon
- **saapi-js** - SDK do Shopee
- **Winston** - Sistema de logs
- **dotenv** - Gerenciamento de variáveis de ambiente

## ✅ Status

- ✅ Amazon: Funcionando com SDK oficial
- ✅ Shopee: Funcionando com saapi-js
- ✅ Links reais (não hardcoded)
- ✅ Retorna 20 produtos por fonte
- ✅ Dados padronizados
- ✅ Logs detalhados
