import { PlackiService, PlackiServiceInterface, UsersTableService, UsersTableServiceInterface } from '../../services';
import { Repository, Sequelize } from 'sequelize-typescript';
import { User } from '../../models';

export class DiContainer implements DiContainerInterface {
  private static _instance?: DiContainer;

  private _postgres: Sequelize;

  private _plackiService?: PlackiServiceInterface;
  private _usersTableService?: UsersTableServiceInterface;

  private constructor() {
    this._postgres = new Sequelize('database', (process.env.USER as unknown) as string, '', {
      dialect: 'postgres',
      host: '127.0.0.1',
      logging: console.log,
      port: 5432,
    });
  }

  public static getInstance(): DiContainer {
    if (!this._instance) this._instance = new DiContainer();
    return this._instance;
  }

  public async init(): Promise<void> {
    await this._postgres.addModels([User]);
    await this._postgres.sync({
      force: true,
    });
  }

  public get plackiService(): PlackiServiceInterface {
    if (!this._plackiService) this._plackiService = new PlackiService();
    return this._plackiService;
  }

  public get usersTableService(): UsersTableServiceInterface {
    if (!this._usersTableService) {
      const repo: Repository<User> = this._postgres.getRepository<User>(User);
      this._usersTableService = new UsersTableService(repo);
    }
    return this._usersTableService;
  }
}

export interface DiContainerInterface {
  plackiService: PlackiServiceInterface;
  usersTableService: UsersTableServiceInterface;
}
