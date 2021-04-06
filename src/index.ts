import { DiContainer } from './core/di-container';
import { Sequelize } from 'sequelize-typescript';

(() => {
  const dependencies = DiContainer.getInstance();
  const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'postgres',
    host: '0.0.0.0',
    logging: true,
    port: 5432,
  });
  sequelize.sync({
    force: true,
  });
  sequelize.getRepository('modelClass');
})();
