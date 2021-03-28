export class PlackiService implements PlackiServiceInterface {
  public getPlacki(): string {
    return 'lubie placki';
  }
}

export interface PlackiServiceInterface {
  getPlacki(): string;
}
