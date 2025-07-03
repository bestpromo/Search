# API de Autenticação JWT - Documentação

## Endpoints de Autenticação

### 1. Login
**POST** `/auth/login`

Realiza login do usuário e retorna tokens de acesso e refresh.

**Body:**
```json
{
  "email": "admin@bestpromo.live",
  "password": "admin123"
}
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Login realizado com sucesso",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@bestpromo.live",
    "name": "Administrador",
    "role": "admin"
  }
}
```

### 2. Registro
**POST** `/auth/register`

Registra um novo usuário no sistema.

**Body:**
```json
{
  "email": "novo@bestpromo.live",
  "password": "senha123",
  "name": "Novo Usuário"
}
```

**Resposta de Sucesso (201):**
```json
{
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 3,
    "email": "novo@bestpromo.live",
    "name": "Novo Usuário",
    "role": "user"
  }
}
```

### 3. Refresh Token
**POST** `/auth/refresh`

Renova o token de acesso usando o refresh token.

**Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Resposta de Sucesso (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Informações do Usuário
**GET** `/auth/me`

Retorna informações do usuário autenticado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Resposta de Sucesso (200):**
```json
{
  "user": {
    "id": 1,
    "email": "admin@bestpromo.live",
    "name": "Administrador",
    "role": "admin"
  }
}
```

## Endpoints de Produtos

### 1. Buscar Produtos
**GET** `/produtos?termo=smartphone`

Busca produtos nos marketplaces (Amazon, Shopee, etc.).

**Headers (Opcional):**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `termo`: Termo de busca (obrigatório)
- `fetchPermalinks`: true/false (opcional)

**Resposta de Sucesso (200):**
```json
{
  "termo": "smartphone",
  "options": {
    "fetchPermalinks": false
  },
  "resultados": [
    {
      "titulo": "Smartphone XYZ",
      "preco": "R$ 899,00",
      "marketplace": "Amazon",
      "link": "https://amazon.com/produto..."
    }
  ],
  "usuario": "Administrador"
}
```

## Endpoints de Administração

### 1. Listar Usuários (Admin Only)
**GET** `/users`

Lista todos os usuários do sistema.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Resposta de Sucesso (200):**
```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@bestpromo.live",
      "name": "Administrador",
      "role": "admin"
    },
    {
      "id": 2,
      "email": "user@bestpromo.live",
      "name": "Usuário",
      "role": "user"
    }
  ],
  "total": 2
}
```

### 2. Obter Usuário Específico
**GET** `/users/:userId`

Obtém detalhes de um usuário específico (próprio usuário ou admin).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Resposta de Sucesso (200):**
```json
{
  "user": {
    "id": 1,
    "email": "admin@bestpromo.live",
    "name": "Administrador",
    "role": "admin"
  }
}
```

### 3. Atualizar Papel do Usuário (Admin Only)
**PATCH** `/users/:userId/role`

Atualiza o papel de um usuário no sistema.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:**
```json
{
  "role": "admin"
}
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Papel do usuário atualizado com sucesso",
  "user": {
    "id": 2,
    "email": "user@bestpromo.live",
    "name": "Usuário",
    "role": "admin"
  }
}
```

## Usuários Padrão

### Administrador
- **Email:** admin@bestpromo.live
- **Senha:** admin123
- **Role:** admin

### Usuário
- **Email:** user@bestpromo.live
- **Senha:** user123
- **Role:** user

## Códigos de Erro

- **400** - Bad Request: Dados inválidos ou faltando
- **401** - Unauthorized: Token não fornecido
- **403** - Forbidden: Token inválido ou expirado
- **409** - Conflict: Usuário já existe
- **500** - Internal Server Error: Erro interno do servidor

## Exemplo de Uso

```bash
# 1. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@bestpromo.live", "password": "admin123"}'

# 2. Usar o token para acessar rotas protegidas
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer <seu_access_token>"

# 3. Buscar produtos (com ou sem autenticação)
curl -X GET "http://localhost:3000/produtos?termo=smartphone" \
  -H "Authorization: Bearer <seu_access_token>"

# 4. Listar usuários (admin only)
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer <seu_access_token>"

# 5. Atualizar papel do usuário (admin only)
curl -X PATCH http://localhost:3000/users/2/role \
  -H "Authorization: Bearer <seu_access_token>" \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}'

# 6. Renovar token
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "<seu_refresh_token>"}'
```

## Observações

- Os tokens de acesso expiram em 15 minutos
- Os tokens de refresh expiram em 7 dias
- A autenticação é opcional para busca de produtos
- Use o refresh token para renovar o access token sem fazer login novamente
- Os dados dos usuários estão em memória (substitua por banco de dados real)
