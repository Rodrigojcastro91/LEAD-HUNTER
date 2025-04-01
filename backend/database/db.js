const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco definido via .env
const dbPath = process.env.DB_PATH || './database/leads.sqlite';

// Conexão
const db = new sqlite3.Database(path.resolve(__dirname, '..', 'database', dbPath), (err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco:', err.message);
  } else {
    console.log('📦 Banco de dados SQLite conectado com sucesso.');
  }
});

// Criação de tabela para armazenar leads impactados
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      instagram TEXT,
      categoria TEXT,
      hashtag_usada TEXT,
      link_postagem TEXT,
      data TEXT
    )
  `);
});

module.exports = db;

require('../models/User'); // <- adiciona isso ao final do db.js

