import { Sequelize } from 'sequelize-typescript';
import { SCOPES } from '../../constants';
import { DatabaseProvider } from '../../services';

export class DiContainer implements DiContainerInterface {
  private _postgres: Sequelize;
  private _services: Map<any, ServiceDescriptor>;

  constructor(postgres: DatabaseProvider<Sequelize>) {
    this._postgres = postgres.connection;
    this._services = new Map<any, ServiceDescriptor>();
  }

  public bind(service: any, options: BindOptions): void {
    this._services.set(service, new ServiceDescriptor(service, options.scope));
  }

  public retrieve(service: any) {
    return this._services.get(service)?.getInstance();
  }
}

export class ServiceDescriptor {
  private _instance: any;

  constructor(private _service: any, private _scope: SCOPES.SINGLETON | SCOPES.TRANSIENT) {
  }

  public getInstance() {
    if (this._scope === SCOPES.SINGLETON) return this.getSingletonInstance();
    if (this._scope === SCOPES.TRANSIENT) return this.getTransientInstance();
  }

  private getSingletonInstance() {
    if (!this._instance) this._instance = new this._service();
    return this._instance;
  }

  private getTransientInstance() {
    return new this._service();
  }

}

export interface BindOptions {
  scope: SCOPES.SINGLETON | SCOPES.TRANSIENT;
}

export interface DiContainerInterface {
}
