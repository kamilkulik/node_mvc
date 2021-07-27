import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { BlogPostsController, CommentsController, UsersController } from './controllers';
import { DiContainer } from './core/di-container';
import {
  ApiResponseService,
  BlogPostsTableService,
  CommentsTableService,
  MapperService,
  PostgresProviderService,
  UsersTableService,
} from './services';
import { routes, configureRouter } from './routes';

(async () => {
  const dependencies = new DiContainer();

  dependencies.add(PostgresProviderService, { scope: 'SINGLETON' });

  const postgresProviderService = dependencies.retrieve(PostgresProviderService);

  await postgresProviderService.init();

  dependencies.add(ApiResponseService, {
    scope: 'TRANSIENT',
  });

  dependencies.add(MapperService, {
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
    .configureDependencies(UsersTableService, ApiResponseService, MapperService);

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

  for (let route of routes) {
    configureRouter(app, dependencies, route);
  }

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    const apiService: ApiResponseService = dependencies.retrieve(ApiResponseService);

    res.send(apiService.errorResponse(error.message));
  });

  app.listen(3000, () => console.log('Listening on 3000'));
})();

/*

  for (let route of routes) {
    app.use(
      route.base,
      (function configureRouter(dependencies: DiContainerInterface, options: RouteOptions) {
        const router = Router();

        const controller = dependencies.retrieve(options.controller);

        for (let endpoint of options.endpoints) {
          router[endpoint.method](endpoint.path, controller[endpoint.cb]);
        }

        return router;
      })(dependencies, route.options)
    );
  }

  */
