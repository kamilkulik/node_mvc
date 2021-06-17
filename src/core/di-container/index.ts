export class DiContainer implements DiContainerInterface {
  private _services: Map<any, ServiceDescriptorInterface>;

  constructor() {
    this._services = new Map<any, ServiceDescriptorInterface>();
  }

  public add(Service: any, options: AddOptions): ServiceDescriptorInterface {
    const serviceDescriptor = options.scope === 'SINGLETON' ? new SingletonDescriptor(Service) : new TransientDescriptor(Service);

    this._services.set(Service, serviceDescriptor);

    return serviceDescriptor;
  }

  public retrieve(Service: any): any {
    const serviceDescriptor: ServiceDescriptorInterface | undefined = this._services.get(Service);

    if (!serviceDescriptor) throw new Error(`no service descriptor for service: ${Service.name}`);

    return serviceDescriptor.retrieve();
  }
}

export class SingletonDescriptor implements ServiceDescriptorInterface {
  private _dependencies?: any[];
  private _instance: any;
  private _Service: any;

  constructor(Service: any) {
    this._Service = Service;
  }

  configureDependencies(...args: any[]): ServiceDescriptorInterface {
    this._dependencies = args;

    return this;
  }

  retrieve() {
    if (!this._instance) this._instance = new this._Service(this._dependencies);

    return this._instance;
  }
}

export class TransientDescriptor implements ServiceDescriptorInterface {
  private _dependencies?: any[];
  private _Service: any;

  constructor(Service: any) {
    this._Service = Service;
  }

  configureDependencies(...args: any[]): ServiceDescriptorInterface {
    this._dependencies = args;

    return this;
  }

  retrieve() {
    return new this._Service(this._dependencies);
  }
}

export interface DiContainerInterface {
  add(Service: any, options: AddOptions): ServiceDescriptorInterface;
  retrieve(Service: any): any;
}

interface AddOptions {
  scope: string;
}

export interface ServiceDescriptorInterface {
  configureDependencies(...args: any[]): ServiceDescriptorInterface;
  retrieve(): any;
}
