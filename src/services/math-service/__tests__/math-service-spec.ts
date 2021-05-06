import 'reflect-metadata';
import { MathService, MathServiceInterface } from '../index';

describe('MathService', () => {
  describe('instance', () => {
    let mathService: MathServiceInterface;

    beforeEach(() => {
      mathService = MathService.getInstance();
    });
    it('can be instantiated', () => {
      expect(mathService).toBeInstanceOf(MathService);
    });

    describe('methods', () => {
      describe('add', () => {
        it('2 + 2 = 4', () => {
          expect(mathService.add(2, 2)).toEqual(4);
        });
      });

      describe('subtract', () => {
        it('2 - 2 = 0', () => {
          expect(mathService.subtract(2, 2)).toEqual(0);
        });
      });
    });
  });
});
