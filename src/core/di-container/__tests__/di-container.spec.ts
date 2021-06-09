import { Sequelize } from 'sequelize-typescript';
import { SCOPES } from '../../../constants';
import { DatabaseProvider, PlackiService } from '../../../services';
import { DiContainer } from '../index';

describe('', () => {
  describe('bind', () => {
    it('', () => {
      const container = new DiContainer({} as unknown as DatabaseProvider<Sequelize>);
      container.bind(PlackiService, {
        scope: SCOPES.SINGLETON,
      });

      expect(container.retrieve(PlackiService)).toBe(container.retrieve(PlackiService));
    });
  });
});
