import { Router } from 'express';
import { CommentsController } from '../controllers';

export function configureCommentsRouter(CommentsController: CommentsController) {
  const router = Router();

  router.get('/:id', CommentsController.getComment);

  return router;
}
