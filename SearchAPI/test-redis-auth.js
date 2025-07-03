const redis = require('redis');

async function testRedisWithAuth() {
  console.log('🔐 Testando Redis com autenticação...');
  
  const client = redis.createClient({
    host: 'search.bestpromo.live',
    port: 6379,
    password: '@Qa23ty67rf2332',
    socket: {
      connectTimeout: 15000,
      commandTimeout: 10000,
      lazyConnect: false,
      keepAlive: true,
      noDelay: true
    },
    retry_strategy: (options) => {
      console.log('🔄 Tentativa de reconexão:', options.attempt);
      if (options.attempt > 3) {
        console.log('❌ Máximo de tentativas atingido');
        return undefined;
      }
      return Math.min(options.attempt * 1000, 3000);
    }
  });

  client.on('connect', () => {
    console.log('🔌 Redis conectando...');
  });

  client.on('ready', () => {
    console.log('✅ Redis pronto!');
  });

  client.on('error', (err) => {
    console.log('❌ Erro Redis:', err.message);
  });

  client.on('end', () => {
    console.log('🔚 Conexão Redis finalizada');
  });

  try {
    console.log('🚀 Iniciando conexão...');
    await client.connect();
    
    console.log('🏓 Testando PING...');
    const pong = await client.ping();
    console.log('✅ PING response:', pong);
    
    console.log('💾 Testando SET...');
    await client.set('test:nodejs', 'Hello from Node.js!', {
      EX: 300 // expira em 5 minutos
    });
    
    console.log('📖 Testando GET...');
    const value = await client.get('test:nodejs');
    console.log('✅ Valor recuperado:', value);
    
    console.log('📊 Testando INFO...');
    const info = await client.info('memory');
    console.log('✅ Info memory length:', info.split('\n').length, 'linhas');
    
    console.log('🧹 Limpando teste...');
    await client.del('test:nodejs');
    
    await client.quit();
    console.log('🎉 Teste concluído com SUCESSO! Redis funcionando perfeitamente!');
    
  } catch (error) {
    console.error('💥 Erro no teste:', error.message);
    console.log('🔧 Sugestões:');
    console.log('   1. Verifique se a senha foi configurada no servidor');
    console.log('   2. Execute: redis-cli CONFIG SET requirepass "@Qa23ty67rf2332"');
    console.log('   3. Execute: redis-cli CONFIG REWRITE');
  }
}

testRedisWithAuth();
