
# 🚀 Lead Hunter – Entrega Orgânica Automatizada para Instagram

O **Lead Hunter** é uma plataforma que substitui o tráfego pago no Instagram utilizando automação segura, segmentada e inteligente.  
Ele entrega postagens para pessoas reais com base em hashtags, interações e perfis estratégicos, **sem violar as diretrizes da plataforma**.

---

## ✅ Funcionalidades principais

- 🔐 Login e Registro com client_id único por cliente
- 🧠 Automatização via Puppeteer com login manual no Instagram
- 📍 Segmentação por hashtags organizadas por categoria
- 👥 Captação real de leads com interações humanas
- 📊 Dashboard com dados individuais para cada cliente
- 🧾 CRM Admin com visão geral de clientes ativos e leads captados
- 💾 Banco de dados SQLite leve e funcional

---

## 🗂️ Estrutura do projeto

```
lead-hunter/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── database/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── admin.html
│   └── assets/
```

---

## 🧪 Como rodar o projeto localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/lead-hunter.git
cd lead-hunter
```

### 2. Instale as dependências no backend
```bash
cd backend
npm install
```

### 3. Crie o arquivo `.env` com:
```
HEADLESS=false
INTERACTION_DELAY=2500
```

### 4. Inicie o servidor backend
```bash
node server.js
```

### 5. Abra o frontend
Abra os arquivos HTML no navegador diretamente pelo `frontend/`:
- `login.html` → para login
- `register.html` → para criação de conta
- `index.html` → após login
- `dashboard.html?id=SEU_CLIENT_ID`
- `admin.html` → visão geral do administrador

---

## 🔐 Acesso e segurança

- Cada usuário tem um `client_id` único
- Todas as informações são isoladas por cliente
- Login com senha criptografada (`bcrypt`)
- Automatização com Puppeteer com login **manual** para evitar bloqueios

---

## 📋 Banco de dados SQLite

Duas tabelas principais:

- `users` → nome, e-mail, senha, client_id
- `leads` → nome, instagram, hashtag, data, client_id

---

## 👨‍💻 Desenvolvido por

Rodrigo Castro – CEO da Impulse Docker  
Desenvolvido com foco em performance, automação e inteligência estratégica para negócios digitais.

---
