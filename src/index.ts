import fs from 'fs';
import { DiContainer } from './core/di-container';
import { PostgresProviderService } from './services';

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

  fs.writeFile('user.json', JSON.stringify(user), (error) => console.error(error));
})();

// HOMEWORK

// do not read about many to many!! Try to figure out how many-to-many would work in SQL
// implement a random service as a singleton - Math service - addition & subtraction - write my tests for it
// Why Math can be implemented as a singleton
// Why a service that holds some state could not be singleton
