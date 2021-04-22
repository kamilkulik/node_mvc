import { Repository } from 'sequelize-typescript';
import { Comment } from '../../models';

export class CommentsTableService implements CommentsTableServiceInterface {
  private _repo: Repository<Comment>;

  constructor(repo: Repository<Comment>) {
    this._repo = repo;
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
