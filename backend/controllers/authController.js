const db = require('../database/db');
const bcrypt = require('bcrypt');

const register = (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  // Gera um client_id único (pode ser email + timestamp)
  const client_id = `${email.split('@')[0]}_${Date.now()}`;

  // Criptografa a senha
  const hashedPassword = bcrypt.hashSync(senha, 10);

  const query = `INSERT INTO users (nome, email, senha, client_id) VALUES (?, ?, ?, ?)`;
  db.run(query, [nome, email, hashedPassword, client_id], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ erro: 'Este e-mail já está em uso.' });
      }
      return res.status(500).json({ erro: err.message });
    }

    return res.status(201).json({ mensagem: 'Conta criada com sucesso.', client_id });
  });
};

const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Preencha e-mail e senha.' });
  }

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (!row || !bcrypt.compareSync(senha, row.senha)) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    return res.status(200).json({ mensagem: 'Login bem-sucedido.', client_id: row.client_id });
  });
};

module.exports = { register, login };
