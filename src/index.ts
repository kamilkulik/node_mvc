import express from 'express';
import { SCOPES } from './constants';
import { DiContainer } from './core/di-container';
import { PlackiService, PostgresProviderService } from './services';

(async () => {
  const postgres = PostgresProviderService.getInstance();

  const status = await postgres.init();

  const dependencies = new DiContainer(postgres);

  dependencies.bind(PlackiService, {
    scope: SCOPES.SINGLETON,
  });

  const s: PlackiService = dependencies.retrieve(PlackiService);
  console.log(s.getPlacki()); // "lubie placki"
  const s2: PlackiService = dependencies.retrieve(PlackiService);
  console.log(s2.getPlacki()); // "lubie placki"
  console.log(s === s2); // true

  const app = express();

  app.listen(3000, () => console.log('Listening on 3000'));
})();
