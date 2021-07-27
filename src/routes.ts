import { BlogPostsController, CommentsController, UsersController } from './controllers';
import { Express, Router } from 'express';
import { DiContainerInterface } from './core/di-container';

export function configureRouter(app: Express, dependencies: DiContainerInterface, route: Route) {
  const router = Router();

  const controller = dependencies.retrieve(route.options.controller);

  for (let endpoint of route.options.endpoints) {
    router[endpoint.method](endpoint.path, controller[endpoint.cb]);
  }

  app.use(route.base, router);
}

export type Route = {
  base: string;
  options: RouteOptions;
};

export type RouteOptions = {
  controller: any;
  endpoints: Endpoint[];
};

type Endpoint = {
  cb: string;
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
  path: string;
};

export const routes: Route[] = [
  {
    base: '/blogposts',
    options: {
      controller: BlogPostsController,
      endpoints: [
        {
          cb: 'createBlogPost',
          method: 'post',
          path: '/',
        },
        {
          cb: 'getBlogPost',
          method: 'get',
          path: '/:id',
        },
      ],
    },
  },
  {
    base: '/comments',
    options: {
      controller: CommentsController,
      endpoints: [
        {
          cb: 'createComment',
          method: 'post',
          path: '/',
        },
        {
          cb: 'getComment',
          method: 'get',
          path: '/:id',
        },
      ],
    },
  },
  {
    base: '/users',
    options: {
      controller: UsersController,
      endpoints: [
        {
          cb: 'createUser',
          method: 'post',
          path: '/',
        },
        {
          cb: 'getUser',
          method: 'get',
          path: '/:id',
        },
      ],
    },
  },
];
