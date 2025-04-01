const db = require('../database/db');

// Criação da tabela de usuários, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      client_id TEXT UNIQUE NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('❌ Erro ao criar tabela users:', err.message);
    } else {
      console.log('✅ Tabela "users" pronta no banco.');
    }
  });
});

module.exports = db;
