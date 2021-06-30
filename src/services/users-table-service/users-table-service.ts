import { Repository, Sequelize } from 'sequelize-typescript';
import { Call } from '../../decorators';
import { BlogPost, Comment, User } from '../../models';
import { DatabaseProvider } from '../postgres-provider-service';

export class CreateUserDTO {
  public readonly email: string;
  public readonly password: string;

  constructor(d: { email: string; password: string }) {
    this.email = d.email;
    this.password = d.password;
  }
}

export class UsersTableService implements UsersTableServiceInterface {
  private _repo: Repository<User>;

  constructor(postgresProviderService: DatabaseProvider<Sequelize>) {
    this._repo = postgresProviderService.connection.getRepository<User>(User);
  }

  @Call(console.log, 'calling UsersTableService#create')
  public create(createUserDTO: CreateUserDTO): Promise<User> {
    return this._repo.create(createUserDTO);
  }

  public findOne(id: number): Promise<User | null> {
    return this._repo.findOne({ where: { id }, include: [{ model: BlogPost }, { model: Comment }] });
  }
}

export interface UsersTableServiceInterface {
  create(createUserDTO: CreateUserDTO): Promise<User>;
  findOne(id: number): Promise<User | null>;
}

// Data Transfer Object
// export type CreateUserDTO = {
//   email: string;
//   password: string;
// };
