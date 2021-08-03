// Mapper Pattern

export class MapperService implements MapperServiceInterface {
  public mapToDTO<S, T>(source: S, c: DTO<S, T>): T {
    return new c(source);
  }
}

type DTO<S, T> = {
  new (source: S): T;
};

export interface MapperServiceInterface {
  mapToDTO<S, T>(source: S, c: DTO<S, T>): T;
}
