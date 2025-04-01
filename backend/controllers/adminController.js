const db = require('../database/db');

const listarClientes = (req, res) => {
  const query = `
    SELECT 
      users.nome,
      users.email,
      users.client_id,
      COUNT(leads.id) AS total_leads
    FROM users
    LEFT JOIN leads ON leads.client_id = users.client_id
    GROUP BY users.client_id
    ORDER BY total_leads DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar dados dos clientes.' });
    }

    res.status(200).json(rows);
  });
};

module.exports = { listarClientes };
