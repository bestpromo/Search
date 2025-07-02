const express = require('express');
const produtosController = require('./controllers/produtosController');

const router = express.Router();

router.get('/produtos', produtosController.buscarProdutos);

module.exports = router;
