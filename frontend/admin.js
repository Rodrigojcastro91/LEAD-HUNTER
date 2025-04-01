document.addEventListener('DOMContentLoaded', async () => {
    const tabela = document.querySelector('#tabela-clientes tbody');
  
    try {
      const res = await fetch('http://localhost:3000/api/admin/clientes');
      const data = await res.json();
  
      if (!Array.isArray(data)) {
        tabela.innerHTML = '<tr><td colspan="4">❌ Erro ao carregar dados.</td></tr>';
        return;
      }
  
      if (data.length === 0) {
        tabela.innerHTML = '<tr><td colspan="4">Nenhum cliente cadastrado ainda.</td></tr>';
        return;
      }
  
      data.forEach(cliente => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${cliente.nome}</td>
          <td>${cliente.email}</td>
          <td>${cliente.client_id}</td>
          <td>${cliente.total_leads}</td>
        `;
        tabela.appendChild(linha);
      });
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      tabela.innerHTML = '<tr><td colspan="4">❌ Erro ao conectar com o servidor.</td></tr>';
    }
  });
  