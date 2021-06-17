import { DiContainer, DiContainerInterface } from '../index';

describe('diContainer', () => {
  describe('', () => {
    let dependencies: DiContainerInterface;

    class SomeService {}
    class SomeOtherService {}
    class AnotherService {}

    beforeEach(() => {
      dependencies = new DiContainer();
    });

    it('returns service in singleton scope', () => {
      dependencies
        .add(SomeService, {
          scope: 'SINGLETON',
        })
        .configureDependencies(SomeOtherService, AnotherService);

      const someServiceInstance = dependencies.retrieve(SomeService);
      const someServiceInstance2 = dependencies.retrieve(SomeService);

      expect(someServiceInstance).toBe(someServiceInstance2);
    });

    it('returns service in transient scope', () => {
      dependencies
        .add(SomeService, {
          scope: 'TRANSIENT',
        })
        .configureDependencies(SomeOtherService, AnotherService);

      const someServiceInstance = dependencies.retrieve(SomeService);
      const someServiceInstance2 = dependencies.retrieve(SomeService);

      expect(someServiceInstance).not.toBe(someServiceInstance2);
    });
  });
});
