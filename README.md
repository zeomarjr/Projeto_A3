# Projeto A3

**Descrição:**  
O Projeto A3 é uma aplicação fullstack desenvolvida como parte de uma entrega acadêmica. Seu objetivo é aplicar conceitos de desenvolvimento web modernos, utilizando tecnologias como Node.js, Express, React, Sequelize e bancos de dados relacionais (MySQL ou MSSQL).

---

## Tecnologias Utilizadas

**Backend:**
- Node.js
- Express
- Sequelize (ORM)
- MySQL2
- MSSQL
- Argon2 (para hash de senhas)
- CORS
- JSON Web Tokens (via `jose`)

**Frontend:**
- React
- React Router DOM
- Axios
- Bootstrap
- React Bootstrap
- React Icons

---

## Estrutura do Projeto

```plaintext
Projeto_A3/
├── backend/        # Servidor Node.js com API REST
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/       # Aplicação React
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
├── README.md
└── package.json
```

---

## Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- MySQL ou SQL Server instalado
- Git instalado

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/zeomarjr/Projeto_A3.git
   ```

2. Instale as dependências do backend:
   ```bash
   cd Projeto_A3/backend
   npm install
   ```

3. Instale as dependências do frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure o banco de dados no backend:
   - Edite o arquivo de configuração de banco (ex: `config/database.js`) com suas credenciais.

5. Rode o backend:
   ```bash
   cd Projeto_A3/backend
   npm start
   ```

6. Rode o frontend:
   ```bash
   cd Projeto_A3/frontend
   npm start
   ```

---

## Funcionalidades Planejadas

- Cadastro de usuários
- Login com autenticação JWT
- Dashboard com visualização de dados
- CRUD de informações específicas do projeto
- Integração segura com banco de dados

---

## Status do Projeto

🚧 Em desenvolvimento... 🚧

---

## Autor

- **Zé Omar Jr**  
  GitHub: [@zeomarjr](https://github.com/zeomarjr)

---



