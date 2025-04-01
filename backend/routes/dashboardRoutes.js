const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rota para pegar estatísticas de um cliente específico
router.get('/:clientId', dashboardController.getDashboardData);

module.exports = router;
