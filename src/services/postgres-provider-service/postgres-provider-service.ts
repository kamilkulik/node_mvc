import { Repository, Sequelize } from 'sequelize-typescript';
import { BlogPost, Comment, User } from '../../models';

export class PostgresProviderService implements DatabaseProvider<Sequelize> {
  private static _instance: PostgresProviderService;

  private _postgres: Sequelize;

  private constructor() {
    this._postgres = new Sequelize('database', (process.env.USER as unknown) as string, '', {
      dialect: 'postgres',
      host: '127.0.0.1',
      logging: console.log,
      port: 5432,
    });
  }

  public static getInstance(): PostgresProviderService {
    if (!this._instance) this._instance = new PostgresProviderService();
    return this._instance;
  }

  public async init(): Promise<void> {
    await this._postgres.addModels([BlogPost, Comment, User]);

    await this._postgres.sync({
      force: true,
    });
  }

  get connection(): Sequelize {
    return this._postgres;
  }
}

export interface DatabaseProvider<T> {
  connection: T;
}
