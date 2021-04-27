import fs from 'fs';
import { DiContainer } from './core/di-container';

(async () => {
  const dependencies = DiContainer.getInstance();
  await dependencies.init();

  await dependencies.usersTableService.create();

  await dependencies.blogPostsTableService.create();
  await dependencies.blogPostsTableService.create();

  await dependencies.commentsTableService.create();

  // const user = await dependencies.usersTableService.findOne(1);

  const blogPost = await dependencies.blogPostsTableService.findOne(1);

  fs.writeFile('user.json', JSON.stringify(blogPost), (error) => console.error(error));
})();
