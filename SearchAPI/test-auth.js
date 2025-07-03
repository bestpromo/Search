#!/usr/bin/env node

/**
 * Script de teste para endpoints de autenticação
 * Testa login, refresh token e busca de produtos
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

const API_BASE = 'http://localhost:3000';

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

async function testAuth() {
  console.log('🧪 Testando autenticação JWT...\n');

  try {
    // 1. Teste de login
    console.log('1️⃣ Testando login...');
    const loginResponse = await makeRequest(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: {
        email: 'admin@bestpromo.live',
        password: 'admin123'
      }
    });

    if (loginResponse.status === 200) {
      console.log('✅ Login realizado com sucesso');
      console.log(`   Token: ${loginResponse.data.accessToken.substring(0, 20)}...`);
      console.log(`   Usuário: ${loginResponse.data.user.name} (${loginResponse.data.user.role})\n`);
      
      const { accessToken, refreshToken } = loginResponse.data;

      // 2. Teste de endpoint protegido
      console.log('2️⃣ Testando endpoint protegido (/auth/me)...');
      const meResponse = await makeRequest(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (meResponse.status === 200) {
        console.log('✅ Endpoint protegido acessível');
        console.log(`   Usuário: ${meResponse.data.user.name}\n`);
      } else {
        console.log('❌ Falha ao acessar endpoint protegido');
        console.log(`   Status: ${meResponse.status}\n`);
      }

      // 3. Teste de busca de produtos com autenticação
      console.log('3️⃣ Testando busca de produtos (autenticado)...');
      const produtosAuthResponse = await makeRequest(`${API_BASE}/produtos?termo=smartphone`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (produtosAuthResponse.status === 200) {
        console.log('✅ Busca de produtos com autenticação');
        console.log(`   Usuário: ${produtosAuthResponse.data.usuario || 'N/A'}\n`);
      } else {
        console.log('❌ Falha na busca de produtos autenticada\n');
      }

      // 4. Teste de refresh token
      console.log('4️⃣ Testando refresh token...');
      const refreshResponse = await makeRequest(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        body: {
          refreshToken: refreshToken
        }
      });

      if (refreshResponse.status === 200) {
        console.log('✅ Refresh token funcionando');
        console.log(`   Novo token: ${refreshResponse.data.accessToken.substring(0, 20)}...\n`);
      } else {
        console.log('❌ Falha no refresh token\n');
      }

    } else {
      console.log('❌ Falha no login');
      console.log(`   Status: ${loginResponse.status}`);
      console.log(`   Erro: ${loginResponse.data.error}\n`);
    }

    // 5. Teste de busca sem autenticação
    console.log('5️⃣ Testando busca de produtos (sem autenticação)...');
    const produtosNoAuthResponse = await makeRequest(`${API_BASE}/produtos?termo=smartphone`);

    if (produtosNoAuthResponse.status === 200) {
      console.log('✅ Busca de produtos sem autenticação');
      console.log(`   Usuário: ${produtosNoAuthResponse.data.usuario || 'Anônimo'}\n`);
    } else {
      console.log('❌ Falha na busca de produtos sem autenticação\n');
    }

    // 6. Teste de token inválido
    console.log('6️⃣ Testando token inválido...');
    const invalidTokenResponse = await makeRequest(`${API_BASE}/auth/me`, {
      headers: {
        'Authorization': 'Bearer token_invalido'
      }
    });

    if (invalidTokenResponse.status === 403) {
      console.log('✅ Token inválido rejeitado corretamente');
    } else {
      console.log('❌ Token inválido não foi rejeitado adequadamente');
    }

    console.log('\n🎉 Testes concluídos!');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
  }
}

// Verificar se o servidor está rodando
console.log('📡 Verificando se o servidor está rodando...');
makeRequest(`${API_BASE}/produtos?termo=teste`)
  .then(() => {
    console.log('✅ Servidor está rodando\n');
    testAuth();
  })
  .catch(() => {
    console.log('❌ Servidor não está rodando. Inicie com: npm run dev');
    console.log('   cd /Users/andre.faustino/Documents/Projects/Bestpromo/Search/SearchAPI && npm run dev');
  });
