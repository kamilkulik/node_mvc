import { BlogPostsController, CommentsController, UsersController } from './controllers';

type Route = {
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
        // {
        //   cb: 'createBlogPost',
        //   method: 'post',
        //   path: '/',
        // },
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
        // {
        //   cb: 'createComment',
        //   method: 'post',
        //   path: '/',
        // },
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
