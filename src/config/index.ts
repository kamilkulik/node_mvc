// MONOSTATE

export class Config {
  private static readonly _FIELD_1: string = 'FIELD_1';
  private static readonly _FIELD_2: string = 'FIELD_2';
  // private static readonly _SOME_ENV_VAR: string = process.env.SOME_ENV_VAR as unknown as string;

  get FIELD_1() {
    return Config._FIELD_1;
  }
  get FIELD_2() {
    return Config._FIELD_2;
  }
}
