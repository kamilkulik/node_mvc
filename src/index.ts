import express from 'express';

(async () => {
  const app = express();

  // app.use('/users', configureUsersRouter(dependencies.usersController));

  app.listen(3000, () => console.log('Listening on 3000'));
})();

// HOMEWORK
