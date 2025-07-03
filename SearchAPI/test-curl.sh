#!/bin/bash

# Exemplos de uso da API com autenticação JWT
# Execute este script para testar todos os endpoints

API_BASE="http://localhost:3000"

echo "🚀 Testando API com autenticação JWT"
echo "====================================="

# 1. Login
echo -e "\n1️⃣ Fazendo login..."
LOGIN_RESPONSE=$(curl -s -X POST "${API_BASE}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@bestpromo.live", "password": "admin123"}')

echo "Resposta do login:"
echo "$LOGIN_RESPONSE" | jq '.'

# Extrair o token
ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.accessToken')
REFRESH_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.refreshToken')

if [ "$ACCESS_TOKEN" = "null" ]; then
  echo "❌ Erro: Não foi possível obter o token de acesso"
  exit 1
fi

echo -e "\n2️⃣ Testando endpoint protegido..."
curl -s -X GET "${API_BASE}/auth/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.'

echo -e "\n3️⃣ Buscando produtos (autenticado)..."
curl -s -X GET "${API_BASE}/produtos?termo=smartphone" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.'

echo -e "\n4️⃣ Buscando produtos (sem autenticação)..."
curl -s -X GET "${API_BASE}/produtos?termo=laptop" | jq '.'

echo -e "\n5️⃣ Testando refresh token..."
curl -s -X POST "${API_BASE}/auth/refresh" \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}" | jq '.'

echo -e "\n6️⃣ Registrando novo usuário..."
curl -s -X POST "${API_BASE}/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@bestpromo.live", "password": "teste123", "name": "Usuário Teste"}' | jq '.'

echo -e "\n7️⃣ Testando token inválido..."
curl -s -X GET "${API_BASE}/auth/me" \
  -H "Authorization: Bearer token_invalido" | jq '.'

echo -e "\n✅ Testes concluídos!"
