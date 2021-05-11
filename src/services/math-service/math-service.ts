import { getMaxListeners } from 'node:process';

export class MathService implements MathServiceInterface {
  private static _instance: MathService;

  private constructor() {}

  static getInstance(): MathService {
    if (!MathService._instance) MathService._instance = new MathService();
    return MathService._instance;
  }

  public add(a: number, b: number): number {
    return a + b;
  }
  public subtract(a: number, b: number): number {
    return a - b;
  }
}

export interface MathServiceInterface {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}
