import { DiContainer } from './core/di-container';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models';

(() => {
  const dependencies = DiContainer.getInstance();
  const sequelize = new Sequelize('database', (process.env.USER as unknown) as string, '', {
    dialect: 'postgres',
    host: '127.0.0.1',
    logging: console.log,
    port: 5432,
  });
  sequelize.addModels([User]);
  sequelize.sync({
    force: true,
  });
  // sequelize.getRepository('modelClass');
})();
