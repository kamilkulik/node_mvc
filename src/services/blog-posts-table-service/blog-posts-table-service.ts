import { Repository } from 'sequelize-typescript';
import { BlogPost } from '../../models';

export class BlogPostsTableService implements BlogPostsTableServiceInterface {
  private _repo: Repository<BlogPost>;

  constructor(repo: Repository<BlogPost>) {
    this._repo = repo;
  }

  public create(): Promise<BlogPost> {
    return this._repo.create({
      content: 'content',
      userId: 1,
    });
  }

  public findOne(id: number): Promise<BlogPost | null> {
    return this._repo.findOne({ where: { id } });
  }
}

export interface BlogPostsTableServiceInterface {
  create(): Promise<BlogPost>;
  findOne(id: number): Promise<BlogPost | null>;
}
