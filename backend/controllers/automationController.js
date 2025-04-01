const instagramAutomation = require('../services/instagramAutomation');

const iniciarAutomacao = async (req, res) => {
  try {
    const { linkPostagem, categoria } = req.body;

    if (!linkPostagem || !categoria) {
      return res.status(400).json({ erro: 'Link da postagem e categoria são obrigatórios.' });
    }

    console.log('🔗 Link recebido:', linkPostagem);
    console.log('📂 Categoria:', categoria);

    // Inicia automação real
    await instagramAutomation.executar(linkPostagem, categoria, req.body.client_id);


    res.status(200).json({ mensagem: 'Automação iniciada com sucesso!' });
  } catch (error) {
    console.error('❌ Erro na automação:', error.message);
    res.status(500).json({ erro: 'Erro ao executar automação.' });
  }
};

module.exports = { iniciarAutomacao };
