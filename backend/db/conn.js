import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('BancoEventos', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
