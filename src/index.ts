import { DiContainer } from './core/di-container';

(async () => {
  const dependencies = DiContainer.getInstance();
  await dependencies.init();

  const status = await dependencies.usersTableService.create();
  const user = await dependencies.usersTableService.findOne(1);

  console.log(status);

  console.log(user);
})();
