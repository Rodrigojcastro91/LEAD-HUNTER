const express = require('express');
const router = express.Router();
const automationController = require('../controllers/automationController');

// Rota para iniciar automação
router.post('/start', automationController.iniciarAutomacao);

module.exports = router;
