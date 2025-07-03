# Configuração do Projeto

## Estrutura do Projeto

```
SearchAPI/
├── src/
│   ├── controllers/        # Controladores da API
│   │   ├── authController.js
│   │   ├── cacheController.js
│   │   ├── produtosController.js
│   │   └── usersController.js
│   ├── middleware/         # Middleware personalizado
│   │   ├── auth.js
│   │   ├── cache.js
│   │   └── roles.js
│   ├── services/           # Serviços externos
│   │   ├── amazon.js
│   │   └── shopee.js
│   ├── utils/              # Utilitários
│   │   ├── jwt.js
│   │   ├── logger.js
│   │   └── redis.js
│   ├── routes.js           # Definição de rotas
│   └── server.js           # Servidor principal
├── scripts/                # Scripts de utilidade
│   ├── cleanup-logs.sh
│   └── generate-password-hash.js
├── logs/                   # Logs da aplicação
├── test-auth.js            # Testes automatizados
├── test-curl.sh           # Testes com curl
├── test-redis-auth.js     # Teste de conexão Redis
└── bestpromo.db           # Banco SQLite
```

## Configuração de Ambiente

### Desenvolvimento
```bash
PORT=3001
REDIS_ENABLED=true
REDIS_HOST=localhost
CACHE_TTL=300
```

### Produção
```bash
PORT=3000
REDIS_ENABLED=true
REDIS_HOST=redis-server.com
REDIS_PASSWORD=senha-forte
CACHE_TTL=600
```

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Testes
npm run test
npm run test:curl
npm run test:redis

# Utilitários
npm run hash-password senha123
npm run clean-logs

# Produção
npm start
```

## Monitoramento

### Logs
- `logs/combined.log` - Todos os logs
- `logs/error.log` - Apenas erros

### Cache
- Headers `X-Cache: HIT|MISS`
- Endpoint `/cache/stats` (admin)

### Saúde da API
- Endpoint `/auth/me` - Verificar autenticação
- Logs de conexão Redis
- Logs de requisições
