import { DataTypes } from "sequelize";
import conn from "../db/conn.js";
import Eventos from "./Eventos.js"; 
import Usuarios from "./Usuario.js"; 

const Ingressos = conn.define("Ingressos", {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "ativo", 
  }
});


Ingressos.belongsTo(Usuarios, {
  foreignKey: "usuarioId",
  as: "usuario"
});

Ingressos.belongsTo(Eventos, {
  foreignKey: "eventoId",
  as: "evento"
});

export default Ingressos;
