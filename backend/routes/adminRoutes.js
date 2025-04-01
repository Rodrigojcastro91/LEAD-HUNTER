const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Rota para listar todos os clientes e seus dados
router.get('/clientes', adminController.listarClientes);

module.exports = router;
