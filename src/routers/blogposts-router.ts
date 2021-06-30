import { Router } from 'express';
import { BlogPostsController } from '../controllers';

export function configureBlogpostsRouter(BlogpostsController: BlogPostsController) {
  const router = Router();

  router.get('/:id', BlogpostsController.getBlogPost);

  return router;
}
