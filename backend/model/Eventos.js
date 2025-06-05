import { Sequelize, DataTypes } from "sequelize";
import conn from "../db/conn.js";

const Eventos = conn.define("Eventos", {
  Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Data: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Hora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Endereco: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
});


export default Eventos;
