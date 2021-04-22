import { DiContainer } from './core/di-container';

(async () => {
  const dependencies = DiContainer.getInstance();
  await dependencies.init();

  const status = await dependencies.usersTableService.create();
  // const user = await dependencies.usersTableService.findOne(1);

  const blogPost = await dependencies.blogPostsTableService.create();
  const comments = await dependencies.commentsTableService.create();

  console.log(blogPost);

  console.log(comments);
})();

// HOMEWORK

// COMMENTs
// id, content, UserId, BlogPostId
