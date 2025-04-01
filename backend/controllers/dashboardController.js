const db = require('../database/db');

const getDashboardData = (req, res) => {
  const clientId = req.params.clientId;

  if (!clientId) {
    return res.status(400).json({ erro: 'Client ID é obrigatório.' });
  }

  const dashboardData = {
    totalLeads: 0,
    categorias: [],
    hashtags: [],
    postagens: []
  };

  db.serialize(() => {
    // Total de leads do cliente
    db.get(
      `SELECT COUNT(*) AS total FROM leads WHERE client_id = ?`,
      [clientId],
      (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        dashboardData.totalLeads = row.total;

        // Categorias distintas
        db.all(
          `SELECT DISTINCT categoria FROM leads WHERE client_id = ?`,
          [clientId],
          (err, rows) => {
            if (err) return res.status(500).json({ erro: err.message });
            dashboardData.categorias = rows.map(r => r.categoria);

            // Hashtags mais usadas
            db.all(
              `SELECT hashtag_usada, COUNT(*) AS total FROM leads WHERE client_id = ? GROUP BY hashtag_usada ORDER BY total DESC LIMIT 10`,
              [clientId],
              (err, rows) => {
                if (err) return res.status(500).json({ erro: err.message });
                dashboardData.hashtags = rows;

                // Postagens impulsionadas
                db.all(
                  `SELECT DISTINCT link_postagem FROM leads WHERE client_id = ?`,
                  [clientId],
                  (err, rows) => {
                    if (err) return res.status(500).json({ erro: err.message });
                    dashboardData.postagens = rows.map(r => r.link_postagem);

                    // Resposta final
                    res.status(200).json(dashboardData);
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};

module.exports = { getDashboardData };
