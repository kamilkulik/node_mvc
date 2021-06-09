import { Sequelize } from 'sequelize-typescript';
import { SCOPES } from '../../constants';
import { DatabaseProvider } from '../../services';

export class DiContainer implements DiContainerInterface {
  private _postgres: Sequelize;
  private _services: Map<any, any>;

  /* simple implementation */
  // private _services: { [index: string]: any };

  constructor(postgres: DatabaseProvider<Sequelize>) {
    this._postgres = postgres.connection;
    this._services = new Map<any, any>();

    /* simple implementation */
    // this._services = {};
  }

  public bind(service: any, options: BindOptions): void {
    if (this._services.get(service)) throw new Error('');

    if (options.scope === SCOPES.SINGLETON) {
      //// . . . .
      //// . . . .

      class Singleton {
        private static _instance: typeof service;

        private constructor() {
        }

        public static getInstance(): typeof service {
          if (!this._instance) this._instance = new service();
          return this._instance;
        }
      }

      //// . . . .
      //// . . . .

      this._services.set(service, {
        scope: options.scope,
        service: Singleton,
      });
    }

    if (options.scope === SCOPES.TRANSIENT) {
      this._services.set(service, {
        scope: options.scope,
        service,
      });
    }
  }

  /* simple implementation */
  // public bind(service: any, name: string): void {
  // if (!this._services[name]) this._services[name] = service;
  // }

  public retrieve(service: any) {
    const wrapperService = this._services.get(service);

    if (wrapperService.scope === SCOPES.SINGLETON) {
      return wrapperService.service.getInstance();
    }

    if (wrapperService.scope === SCOPES.TRANSIENT) {
      return new wrapperService.service();
    }
  }

  /* simple implementation */
  // public retrieve(name: string) {
  //   return this._services[name];
  // }
}

export interface BindOptions {
  scope: SCOPES.SINGLETON | SCOPES.TRANSIENT;
}

export interface DiContainerInterface {
}
