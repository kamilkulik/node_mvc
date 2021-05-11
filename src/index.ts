import { DiContainer } from './core/di-container';
import { PostgresProviderService } from './services';
import express from 'express';
import { configureUsersRouter } from './routers/';

(async () => {
  const postgres = PostgresProviderService.getInstance();

  await postgres.init();

  const dependencies = new DiContainer(postgres);

  await dependencies.usersTableService.create();
  await dependencies.blogPostsTableService.create();
  await dependencies.blogPostsTableService.create();
  await dependencies.commentsTableService.create();

  const user = await dependencies.usersTableService.findOne(1);
  const blogPost = await dependencies.blogPostsTableService.findOne(1);

  const app = express();

  app.use('/users', configureUsersRouter(dependencies.usersController));

  app.listen(3000, () => console.log('Listening on 3000'));
})();

// HOMEWORK
