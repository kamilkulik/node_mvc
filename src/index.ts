import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { BlogPostsController, CommentsController, UsersController } from './controllers';
import { DiContainer } from './core/di-container';
import { configureBlogpostsRouter, configureCommentsRouter, configureUsersRouter } from './routers';
import {
  ApiResponseService,
  BlogPostsTableService,
  CommentsTableService,
  PostgresProviderService,
  UsersTableService,
} from './services';

(async () => {
  const dependencies = new DiContainer();

  dependencies.add(PostgresProviderService, { scope: 'SINGLETON' });

  const postgresProviderService = dependencies.retrieve(PostgresProviderService);

  await postgresProviderService.init();

  dependencies.add(ApiResponseService, {
    scope: 'TRANSIENT',
  });

  dependencies
    .add(BlogPostsTableService, {
      scope: 'TRANSIENT',
    })
    .configureDependencies(PostgresProviderService);

  dependencies
    .add(CommentsTableService, {
      scope: 'TRANSIENT',
    })
    .configureDependencies(PostgresProviderService);

  dependencies
    .add(UsersTableService, {
      scope: 'TRANSIENT',
    })
    .configureDependencies(PostgresProviderService);

  dependencies
    .add(UsersController, {
      scope: 'SINGLETON',
    })
    .configureDependencies(UsersTableService, ApiResponseService);

  dependencies
    .add(BlogPostsController, {
      scope: 'SINGLETON',
    })
    .configureDependencies(BlogPostsTableService, ApiResponseService);

  dependencies
    .add(CommentsController, {
      scope: 'SINGLETON',
    })
    .configureDependencies(CommentsTableService, ApiResponseService);

  const usersTableService = dependencies.retrieve(UsersTableService);
  await usersTableService.create();

  const blogPostsTableService = dependencies.retrieve(BlogPostsTableService);
  await blogPostsTableService.create();

  const commentsTableService = dependencies.retrieve(CommentsTableService);
  await commentsTableService.create();

  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/blogposts', configureBlogpostsRouter(dependencies.retrieve(BlogPostsController)));

  app.use('/comments', configureCommentsRouter(dependencies.retrieve(CommentsController)));

  app.use('/users', configureUsersRouter(dependencies.retrieve(UsersController)));

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    const apiService: ApiResponseService = dependencies.retrieve(ApiResponseService);

    res.send(apiService.errorResponse(error.message));
  });

  app.listen(3000, () => console.log('Listening on 3000'));
})();

// HOMEWORK

// add additional validator to user DTO password - implement password policy

// adjust controllers - add try catch

// class based decorator to bind methods to this
