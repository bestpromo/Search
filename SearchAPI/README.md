# Search API - Bestpromo

API para busca de produtos em múltiplos marketplaces (Amazon, Shopee, Mercado Livre) com autenticação JWT e cache Redis.

## 🚀 Funcionalidades

- **Autenticação JWT** com access e refresh tokens
- **Cache Redis** para performance otimizada
- **Busca de produtos** em múltiplos marketplaces
- **Controle de acesso** baseado em roles (admin/user)
- **Gerenciamento de usuários** (admin only)
- **Logs detalhados** com Winston
- **Middleware de segurança** personalizado
- **Gerenciamento de cache** com TTL configurável

## 📋 Requisitos

- Node.js >= 14
- npm ou yarn
- Redis Server (local ou remoto)

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

# Configuração Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=sua-senha-redis
REDIS_DB=0
CACHE_TTL=300
REDIS_ENABLED=true
```

## 🔧 Redis Setup

### Instalação Local (macOS)
```bash
# Instalar Redis via Homebrew
brew install redis

# Iniciar Redis
brew services start redis

# Testar conexão
redis-cli ping
```

### Instalação Local (Ubuntu/Debian)
```bash
# Instalar Redis
sudo apt update
sudo apt install redis-server

# Iniciar Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Testar conexão
redis-cli ping
```

### Configuração Remota
Se usando Redis remoto, configure no `.env`:
```env
REDIS_HOST=seu-servidor-redis.com
REDIS_PORT=6379
REDIS_PASSWORD=sua-senha-forte
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

### Endpoints de Cache (Admin)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/cache/stats` | Estatísticas do cache | Admin |
| POST | `/cache/clear/produtos` | Limpar cache de produtos | Admin |
| POST | `/cache/clear/all` | Limpar todo o cache | Admin |
| GET | `/cache/key/:key` | Obter valor de chave específica | Admin |
| DELETE | `/cache/key/:key` | Deletar chave específica | Admin |

### Endpoints de Logs (Admin)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/logs/stats` | Estatísticas dos logs | Admin |
| POST | `/logs/rotate` | Forçar rotação de logs | Admin |
| PATCH | `/logs/config` | Configurar parâmetros de rotação | Admin |

## 💾 Cache Redis

O sistema utiliza Redis para cache com as seguintes características:

- **TTL padrão**: 300 segundos (5 minutos)
- **Chaves de cache**: `produtos:{termo}:{options}`
- **Headers de cache**: `X-Cache: HIT|MISS`
- **Fallback**: Se Redis não estiver disponível, a API funciona sem cache

### Testando Cache

```bash
# Primeira busca (Cache MISS)
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3001/produtos?termo=notebook"

# Segunda busca (Cache HIT)
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3001/produtos?termo=notebook"

# Verificar estatísticas (Admin)
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "http://localhost:3001/cache/stats"
```

### Testando Logs

```bash
# Estatísticas dos logs (Admin)
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "http://localhost:3001/logs/stats"

# Forçar rotação
curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" \
  "http://localhost:3001/logs/rotate"

# Configurar rotação
curl -X PATCH -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"maxSizeMB": 100, "maxDays": 10}' \
  "http://localhost:3001/logs/config"
```

## 🧪 Testes

```bash
# Teste automatizado
npm run test

# Testes com curl
npm run test:curl

# Teste Redis
npm run test:redis

# Teste rotação de logs
npm run test:logs

# Gerar hash de senha
npm run hash-password minhasenha123

# Limpar logs antigos
npm run clean-logs
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

## 📋 Gestão de Logs

O sistema inclui rotação automática de logs baseada em tamanho e idade dos arquivos.

### Configuração de Logs (.env)
```env
# Configuração de Rotação de Logs
LOG_MAX_SIZE_MB=50          # Tamanho máximo em MB
LOG_MAX_DAYS=7              # Idade máxima em dias
LOG_ROTATION_ENABLED=true   # Habilitar rotação automática
```

### Funcionamento
- **Verificação automática**: A cada hora
- **Critério de rotação**: Tamanho OU idade excedidos
- **Backup automático**: Arquivo original vira backup com timestamp
- **Limpeza**: Backups antigos são removidos automaticamente

### Exemplo de Rotação
```
combined.log (51MB) → combined-2025-07-03-14-18-05.log
combined.log (0 bytes) - novo arquivo limpo
```

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
