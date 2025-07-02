require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const logger = require('./utils/logger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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
