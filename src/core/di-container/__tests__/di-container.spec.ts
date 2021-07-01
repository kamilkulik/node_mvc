import { DiContainer, DiContainerInterface } from '../index';

describe('diContainer', () => {
  describe('', () => {
    let dependencies: DiContainerInterface;

    class SomeService {
    }

    class PostgresUser {
      constructor(public postgresProviderService: PostgresProviderService) {
      }
    }

    class PostgresProviderService {
      public TEST(string: string) {
        return string;
      }
    }

    beforeEach(() => {
      dependencies = new DiContainer();
    });

    it('returns service in singleton scope', () => {
      dependencies.add(SomeService, {
        scope: 'SINGLETON',
      });

      const someServiceInstance = dependencies.retrieve(SomeService);
      const someServiceInstance2 = dependencies.retrieve(SomeService);

      expect(someServiceInstance).toBe(someServiceInstance2);
    });

    it('returns service in transient scope', () => {
      dependencies.add(SomeService, {
        scope: 'TRANSIENT',
      });

      const someServiceInstance = dependencies.retrieve(SomeService);
      const someServiceInstance2 = dependencies.retrieve(SomeService);

      expect(someServiceInstance).not.toBe(someServiceInstance2);
    });

    it('asdf', () => {
      dependencies
        .add(PostgresUser, {
          scope: 'SINGLETON',
        })
        .configureDependencies(PostgresProviderService);

      dependencies.add(PostgresProviderService, {
        scope: 'SINGLETON',
      });

      const postgresUserInstance = dependencies.retrieve(PostgresUser);

      expect(postgresUserInstance).toBeDefined();
      expect(postgresUserInstance.postgresProviderService).toBeDefined();
      expect(postgresUserInstance.postgresProviderService.TEST('string')).toBe('string');
    });

    it('asdf', () => {
      dependencies
        .add(PostgresUser, {
          scope: 'TRANSIENT',
        })
        .configureDependencies(PostgresProviderService);

      dependencies.add(PostgresProviderService, {
        scope: 'SINGLETON',
      });

      const postgresUserInstance = dependencies.retrieve(PostgresUser);

      expect(postgresUserInstance).toBeDefined();
      expect(postgresUserInstance.postgresProviderService).toBeDefined();
      expect(postgresUserInstance.postgresProviderService.TEST('string')).toBe('string');
    });
  });
});
