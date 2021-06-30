import { Repository, Sequelize } from 'sequelize-typescript';
import { Comment } from '../../models';
import { DatabaseProvider } from '../postgres-provider-service';

export class CommentsTableService implements CommentsTableServiceInterface {
  private _repo: Repository<Comment>;

  constructor(postgresProviderService: DatabaseProvider<Sequelize>) {
    this._repo = postgresProviderService.connection.getRepository<Comment>(Comment);
  }

  public create(): Promise<Comment> {
    return this._repo.create({
      blogPostId: 1,
      content: 'content',
      userId: 1,
    });
  }

  public findOne(id: number): Promise<Comment | null> {
    return this._repo.findOne({ where: { id } });
  }
}

export interface CommentsTableServiceInterface {
  create(): Promise<Comment>;
  findOne(id: number): Promise<Comment | null>;
}
