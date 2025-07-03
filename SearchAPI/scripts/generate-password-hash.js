const { hashPassword } = require('./src/utils/jwt');

/**
 * Script para gerar hash de senhas
 * Uso: node generate-password-hash.js <senha>
 */
async function generateHash() {
  const password = process.argv[2];
  
  if (!password) {
    console.log('❌ Uso: node generate-password-hash.js <senha>');
    process.exit(1);
  }
  
  try {
    const hash = await hashPassword(password);
    console.log('✅ Hash gerado com sucesso:');
    console.log(`Senha: ${password}`);
    console.log(`Hash: ${hash}`);
  } catch (error) {
    console.error('❌ Erro ao gerar hash:', error.message);
    process.exit(1);
  }
}

generateHash();
