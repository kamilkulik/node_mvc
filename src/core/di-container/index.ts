import { PlackiService, PlackiServiceInterface } from '../../services/placki-service';

export class DiContainer implements DiContainerInterface {
  private static _instance?: DiContainer; // static keyword gives access to class NOT the instance

  private _plackiService?: PlackiServiceInterface;

  private constructor() {}

  public static getInstance(): DiContainer {
    if (!this._instance) this._instance = new DiContainer();
    return this._instance;
  }

  public get plackiService(): PlackiServiceInterface {
    if (!this._plackiService) this._plackiService = new PlackiService();
    return this._plackiService;
  }
}

export interface DiContainerInterface {
  // interfaces deal ONLY with the instance part of the class i.e. non-static members i.e. instance variables
  plackiService: PlackiServiceInterface;
}
