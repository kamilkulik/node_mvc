import { Repository, Sequelize } from 'sequelize-typescript';
import { Call } from '../../decorators';
import { CreateUserDTO } from '../../dtos';
import { BlogPost, Comment, User } from '../../models';
import { DatabaseProvider } from '../postgres-provider-service';

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
