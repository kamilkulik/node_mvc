import { Sequelize } from 'sequelize-typescript';
import { BlogPost, Comment, User } from '../../models';

export class PostgresProviderService implements DatabaseProvider<Sequelize> {
  private _postgres: Sequelize;

  constructor() {
    this._postgres = new Sequelize('database', process.env.USER as unknown as string, '', {
      dialect: 'postgres',
      host: '127.0.0.1',
      logging: console.log,
      port: 5432,
    });
  }

  get connection(): Sequelize {
    return this._postgres;
  }

  public async init(): Promise<void> {
    await this._postgres.addModels([BlogPost, Comment, User]);

    await this._postgres.sync({
      force: true,
    });
  }
}

export interface DatabaseProvider<T> {
  connection: T;

  init(): Promise<void>;
}
