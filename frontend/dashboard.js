document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('dados-dashboard');
  
    // Captura o clientId da URL (ex: dashboard.html?id=cliente001)
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');
  
    if (!clientId) {
      container.innerHTML = '<p style="color:#FFD700;">❌ Cliente não identificado. Acesse com ?id=SEU_ID no link.</p>';
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3000/api/dashboard/${clientId}`);
      const data = await res.json();
  
      if (res.ok) {
        container.innerHTML = `
          <div class="card"><strong>👥 Total de Leads Impactados:</strong> ${data.totalLeads}</div>
  
          <div class="card"><strong>📂 Categorias Utilizadas:</strong>
            <ul>${data.categorias.map(c => `<li>${c}</li>`).join('')}</ul>
          </div>
  
          <div class="card"><strong>🔥 Hashtags Mais Usadas:</strong>
            <ul>${data.hashtags.map(h => `<li>${h.hashtag_usada} (${h.total})</li>`).join('')}</ul>
          </div>
  
          <div class="card"><strong>🔗 Postagens Impulsionadas:</strong>
            <ul>${data.postagens.map(p => `<li><a href="${p}" target="_blank">${p}</a></li>`).join('')}</ul>
          </div>
        `;
      } else {
        container.innerHTML = `<p style="color:#FFD700;">❌ Erro: ${data.erro || 'Erro desconhecido.'}</p>`;
      }
    } catch (err) {
      container.innerHTML = '<p style="color:#FF4444;">❌ Erro ao conectar com o servidor.</p>';
    }
  });
  