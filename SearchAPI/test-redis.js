const redis = require('redis');

async function testRedis() {
  console.log('🧪 Testando conexão Redis...');
  
  const client = redis.createClient({
    host: 'search.bestpromo.live',
    port: 6379,
    socket: {
      connectTimeout: 30000,
      lazyConnect: false
    }
  });

  client.on('connect', () => {
    console.log('✅ Redis conectado!');
  });

  client.on('error', (err) => {
    console.log('❌ Erro Redis:', err.message);
  });

  try {
    await client.connect();
    
    // Testar ping
    const pong = await client.ping();
    console.log('🏓 Ping response:', pong);
    
    // Testar set/get
    await client.set('test:key', 'Hello Redis!');
    const value = await client.get('test:key');
    console.log('📦 Test value:', value);
    
    // Testar info
    const info = await client.info();
    console.log('ℹ️  Redis info length:', info.length);
    
    await client.quit();
    console.log('🎉 Teste concluído com sucesso!');
    
  } catch (error) {
    console.error('💥 Erro no teste:', error.message);
  }
}

testRedis();
