#!/usr/bin/env node

/**
 * Script para testar rotação de logs
 */

const path = require('path');
const fs = require('fs');

// Configurar variáveis de ambiente para teste
process.env.LOG_MAX_SIZE_MB = '1'; // 1MB para teste
process.env.LOG_MAX_DAYS = '1'; // 1 dia para teste
process.env.LOG_ROTATION_ENABLED = 'true';

const logRotator = require('../src/utils/logRotator');

async function testLogRotation() {
  console.log('🧪 Testando rotação de logs...');
  
  const logsDir = path.join(__dirname, '../logs');
  
  // Garantir que o diretório existe
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  // Criar arquivo de teste grande
  const testFile = path.join(logsDir, 'combined.log');
  const testContent = 'X'.repeat(2 * 1024 * 1024); // 2MB de conteúdo
  
  console.log('📝 Criando arquivo de teste (2MB)...');
  fs.writeFileSync(testFile, testContent);
  
  // Obter estatísticas antes
  console.log('📊 Estatísticas antes da rotação:');
  const statsBefore = logRotator.getStats();
  console.log(JSON.stringify(statsBefore, null, 2));
  
  // Executar rotação
  console.log('🔄 Executando rotação...');
  await logRotator.checkAndRotate();
  
  // Obter estatísticas depois
  console.log('📊 Estatísticas após a rotação:');
  const statsAfter = logRotator.getStats();
  console.log(JSON.stringify(statsAfter, null, 2));
  
  // Verificar se backup foi criado
  const files = fs.readdirSync(logsDir);
  const backupFiles = files.filter(file => 
    file.startsWith('combined-') && file.endsWith('.log')
  );
  
  console.log('📁 Arquivos de backup criados:', backupFiles);
  
  // Verificar se arquivo original foi limpo
  const originalSize = fs.statSync(testFile).size;
  console.log(`📏 Tamanho do arquivo original após rotação: ${originalSize} bytes`);
  
  if (originalSize === 0 && backupFiles.length > 0) {
    console.log('✅ Rotação funcionou corretamente!');
  } else {
    console.log('❌ Rotação pode ter falhado');
  }
  
  console.log('🎉 Teste concluído!');
}

// Executar teste
testLogRotation().catch(console.error);
