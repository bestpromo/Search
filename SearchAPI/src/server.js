require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const logger = require('./utils/logger');
const redisService = require('./utils/redis');
const logRotator = require('./utils/logRotator');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar cache Redis
redisService.connect().catch(err => {
  logger.error('Erro ao inicializar cache', { error: err.message });
});

// Inicializar rotação automática de logs
logRotator.startAutoRotation(60); // Verificar a cada hora

app.use(express.json());
app.use('/', routes);

app.use((req, res, next) => {
  logger.info('Request', { method: req.method, url: req.url, body: req.body, query: req.query });
  next();
});

app.use((err, req, res, next) => {
  logger.error('Unhandled error', { message: err.message, stack: err.stack });
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('Recebido SIGTERM, encerrando servidor...');
  await redisService.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('Recebido SIGINT, encerrando servidor...');
  await redisService.disconnect();
  process.exit(0);
});
