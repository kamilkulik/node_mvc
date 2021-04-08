import { Repository, Sequelize } from 'sequelize-typescript';
import { DiContainer } from './core/di-container';
import { User } from './models';

(async () => {
  const dependencies = DiContainer.getInstance();
  const sequelize = new Sequelize('database', (process.env.USER as unknown) as string, '', {
    dialect: 'postgres',
    host: '127.0.0.1',
    logging: console.log,
    port: 5432,
  });

  await sequelize.addModels([User]);
  await sequelize.sync({
    force: true,
  });

  // GET REPO
  const repo: Repository<User> = sequelize.getRepository<User>(User);

  // CREATE USER
  const status: User = await repo.create({
    email: 'przemwierzbicki@email.com',
    password: 'password',
  });

  // LOG CREATE RETURN VALUE
  console.log(status);

  // GET USER
  const user: User | null = await repo.findOne({ where: { id: 1 } });

  // LOG GET RETURN VALUE
  console.log(user);
})();
