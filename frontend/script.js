document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-automacao');
    const statusDiv = document.getElementById('status');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const linkPostagem = document.getElementById('linkPostagem').value.trim();
      const categoria = document.getElementById('categoria').value;
  
      if (!linkPostagem || !categoria) {
        statusDiv.textContent = 'Preencha todos os campos.';
        statusDiv.style.color = '#FFD700';
        return;
      }
  
      statusDiv.textContent = '⏳ Iniciando automação...';
      statusDiv.style.color = '#ffffff';
  
      try {
        const response = await fetch('http://localhost:3000/api/automation/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ linkPostagem, categoria })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          statusDiv.textContent = '✅ Automação iniciada com sucesso!';
          statusDiv.style.color = '#00FF99';
        } else {
          statusDiv.textContent = `❌ Erro: ${data.erro || 'não identificado'}`;
          statusDiv.style.color = '#FFD700';
        }
      } catch (err) {
        statusDiv.textContent = '❌ Erro ao conectar com o servidor.';
        statusDiv.style.color = '#FF4444';
      }
    });
  });
  