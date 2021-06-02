import express from 'express';
import { DiContainer } from './core/di-container';
import { configureUsersRouter } from './routers/';
import { PostgresProviderService } from './services';

// import { Call } from './decorators';

(async () => {
  // class SomeClass {
  //   @Call(console.log, 'From higher order decorator: "sdfg"')
  //   @Call(console.log, 'From decorator: "asdf"')
  //   someMethod(): void {
  //     console.log('Called: someMethod');
  //   }
  // }
  //
  // const c = new SomeClass();

  // c.someMethod();
  // c.someMethod();

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
