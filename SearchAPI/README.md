# Search API - Bestpromo

API para busca de produtos em múltiplos marketplaces (Amazon, Shopee, Mercado Livre) com autenticação JWT.

## 🚀 Funcionalidades

- **Autenticação JWT** com access e refresh tokens
- **Busca de produtos** em múltiplos marketplaces
- **Controle de acesso** baseado em roles (admin/user)
- **Gerenciamento de usuários** (admin only)
- **Logs detalhados** com Winston
- **Middleware de segurança** personalizado

## 📋 Requisitos

- Node.js >= 14
- npm ou yarn

## 🛠️ Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd SearchAPI

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Inicie o servidor
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```env
# Configuração do Amazon
AMAZON_ASSOCIATE_TAG=seu-tag-aqui
AMAZON_ACCESS_KEY=sua-chave-aqui
AMAZON_SECRET_KEY=sua-chave-secreta-aqui

# Configuração do Shopee
SHOPEE_APPID=seu-app-id
SHOPEE_SECRET=sua-chave-secreta

# Configuração do Mercado Livre
MERCADOLIVRE_CLIENT_ID=seu-client-id
MERCADOLIVRE_CLIENT_SECRET=sua-chave-secreta
MERCADOLIVRE_ACCESS_TOKEN=seu-token-acesso
MERCADOLIVRE_SITE_ID=MLB

# Configuração JWT
JWT_SECRET=sua-chave-jwt-super-secreta
```

## 🔐 Autenticação

### Usuários Padrão

- **Admin**: `admin@bestpromo.live` / `admin123`
- **User**: `user@bestpromo.live` / `user123`

### Endpoints de Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/login` | Login do usuário | Pública |
| POST | `/auth/register` | Registro de novo usuário | Pública |
| POST | `/auth/refresh` | Renovar access token | Pública |
| GET | `/auth/me` | Dados do usuário autenticado | Obrigatória |

### Endpoints de Produtos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/produtos` | Buscar produtos | Opcional |

### Endpoints de Administração

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/users` | Listar usuários | Admin |
| GET | `/users/:id` | Obter usuário | Owner/Admin |
| PATCH | `/users/:id/role` | Atualizar papel | Admin |

## 🧪 Testes

```bash
# Teste automatizado
node test-auth.js

# Testes com curl
./test-curl.sh

# Gerar hash de senha
node generate-password-hash.js minhasenha123
```

## 📖 Documentação Completa

Veja [API_AUTH_DOCS.md](./API_AUTH_DOCS.md) para documentação completa dos endpoints.

## 🏗️ Estrutura do Projeto

```
src/
├── controllers/
│   ├── authController.js      # Autenticação
│   ├── produtosController.js  # Busca de produtos
│   └── usersController.js     # Gerenciamento de usuários
├── middleware/
│   ├── auth.js               # Middleware de autenticação
│   └── roles.js              # Middleware de autorização
├── services/
│   ├── amazon.js             # Integração Amazon
│   └── shopee.js             # Integração Shopee
├── utils/
│   ├── jwt.js                # Utilidades JWT
│   └── logger.js             # Logging
├── routes.js                 # Definição das rotas
└── server.js                 # Servidor principal
```

## 🔒 Segurança

- Tokens JWT com expiração (15min access, 7d refresh)
- Senhas criptografadas com bcrypt (12 rounds)
- Middleware de autenticação e autorização
- Logging detalhado de acessos e tentativas

## 🚦 Status da API

- ✅ Autenticação JWT
- ✅ Busca de produtos
- ✅ Controle de acesso
- ✅ Gerenciamento de usuários
- ✅ Logs detalhados
- ⏳ Integração com banco de dados
- ⏳ Rate limiting
- ⏳ Caching

## 📝 TODO

- [ ] Migrar dados para banco de dados real
- [ ] Implementar rate limiting
- [ ] Adicionar cache Redis
- [ ] Implementar paginação
- [ ] Adicionar validação de entrada
- [ ] Implementar WebSocket para notificações
- [ ] Adicionar métricas e monitoramento

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
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
