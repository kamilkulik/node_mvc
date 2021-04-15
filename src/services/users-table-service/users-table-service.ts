import { Repository } from 'sequelize-typescript';
import { User } from '../../models';

export class UsersTableService implements UsersTableServiceInterface {
  private _repo: Repository<User>;

  constructor(repo: Repository<User>) {
    this._repo = repo;
  }

  public create(): Promise<User> {
    return this._repo.create({
      email: 'przemwierzbicki@email.com',
      password: 'password',
    });
  }

  public findOne(id: number): Promise<User | null> {
    return this._repo.findOne({ where: { id } });
  }
}

export interface UsersTableServiceInterface {
  create(): Promise<User>;
  findOne(id: number): Promise<User | null>;
}
