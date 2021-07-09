export class DiContainer implements DiContainerInterface {
  private _services: Map<any, ServiceDescriptorInterface>;

  constructor() {
    this._services = new Map<any, ServiceDescriptorInterface>();
  }

  public add(Service: any, options: AddOptions): ServiceDescriptorInterface {
    const serviceDescriptor =
      options.scope === 'SINGLETON' ? new SingletonDescriptor(this, Service) : new TransientDescriptor(this, Service);

    this._services.set(Service, serviceDescriptor);

    return serviceDescriptor;
  }

  public retrieve(Service: any): any {
    const serviceDescriptor: ServiceDescriptorInterface | undefined = this._services.get(Service);

    if (!serviceDescriptor) throw new Error('no service descriptor');

    return serviceDescriptor.retrieve();
  }
}

export class SingletonDescriptor implements ServiceDescriptorInterface {
  private _dependencies?: any[];
  private _diContainer: DiContainerInterface;
  private _instance: any;
  private _Service: any;

  constructor(diContainer: DiContainerInterface, Service: any) {
    this._diContainer = diContainer;
    this._Service = Service;
  }

  configureDependencies(...args: any[]): ServiceDescriptorInterface {
    this._dependencies = args;

    return this;
  }

  retrieve() {
    if (!this._instance) {
      const dependencies = this._dependencies?.map((Service) => {
        return this._diContainer.retrieve(Service);
      });

      this._instance = dependencies?.length ? new this._Service(...dependencies) : new this._Service();
    }

    return this._instance;
  }
}

export class TransientDescriptor implements ServiceDescriptorInterface {
  private _dependencies?: any[];
  private _diContainer: DiContainerInterface;
  private _Service: any;

  constructor(diContainer: DiContainerInterface, Service: any) {
    this._diContainer = diContainer;
    this._Service = Service;
  }

  configureDependencies(...args: any[]): ServiceDescriptorInterface {
    this._dependencies = args;

    return this;
  }

  retrieve() {
    const dependencies = this._dependencies?.map((Service) => {
      return this._diContainer.retrieve(Service);
    });

    return dependencies?.length ? new this._Service(...dependencies) : new this._Service();
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
