import { Router } from 'express';
import { UsersController } from '../controllers';

export function configureUsersRouter(usersController: UsersController) {
  const router = Router();

  router.post('/', usersController.createUser);

  router.get('/:id', usersController.getUser);

  return router;
}
