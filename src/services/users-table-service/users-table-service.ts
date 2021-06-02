import { Repository } from 'sequelize-typescript';
import { Call } from '../../decorators';
import { BlogPost, Comment, User } from '../../models';

export class UsersTableService implements UsersTableServiceInterface {
  private _repo: Repository<User>;

  constructor(repo: Repository<User>) {
    this._repo = repo;
  }

  @Call(console.log, 'calling UsersTableService#create')
  public create(): Promise<User> {
    return this._repo.create({
      email: 'przemwierzbicki@email.com',
      password: 'password',
    });
  }

  public findOne(id: number): Promise<User | null> {
    return this._repo.findOne({ where: { id }, include: [{ model: BlogPost }, { model: Comment }] });
  }
}

export interface UsersTableServiceInterface {
  create(): Promise<User>;
  findOne(id: number): Promise<User | null>;
}
