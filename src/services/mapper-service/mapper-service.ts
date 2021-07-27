// Mapper Pattern

export class MapperService {
  public map<S, T>(source: S, c: DTO<S, T>): T {
    return new c(source);
  }
}

type DTO<S, T> = {
  new (source: S): T;
};
