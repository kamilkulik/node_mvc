import { DiContainer } from './core/di-container';

(() => {
  const dependencies = DiContainer.getInstance();
  console.log(dependencies.plackiService.getPlacki());
})();
