import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import routerUser from "./router/userRoutes.js";
import routerEvento from "./router/EventoRoutes.js";
import routerIngresso from "./router/IngressoRoutes.js";
import sequelize from "./db/conn.js";

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users", routerUser);
app.use("/eventos", routerEvento);
app.use("/ingressos", routerIngresso);

sequelize
  .sync({ force: false }) 
  .then(() => {
    console.log("Tabelas criadas ou já existem");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar com o banco de dados", error);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
