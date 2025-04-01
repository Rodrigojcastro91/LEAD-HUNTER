const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const automationRoutes = require('./routes/automationRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/automation', automationRoutes);

// Status
app.get('/', (req, res) => {
  res.send('🔥 Lead Hunter Backend Rodando...');
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
