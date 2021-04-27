import fs from 'fs';
import { DiContainer } from './core/di-container';

(async () => {
  const dependencies = DiContainer.getInstance();
  await dependencies.init();

  await dependencies.usersTableService.create();

  await dependencies.blogPostsTableService.create();
  await dependencies.blogPostsTableService.create();

  await dependencies.commentsTableService.create();

  const user = await dependencies.usersTableService.findOne(1);
  const blogPost = await dependencies.blogPostsTableService.findOne(1);

  fs.writeFile('user.json', JSON.stringify(user), (error) => console.error(error));
})();

// HOMEWORK

// extract SQL query and paste into PGAdmin and check what SQL is returning
// check other options for the include option in findOne query
// do not read about many to many!! Try to figure out how many-to-many would work in SQL
