import { Repository, Sequelize } from 'sequelize-typescript';
import { CreateBlogPostDTO } from '../../dtos';
import { BlogPost, User } from '../../models';
import { DatabaseProvider } from '../postgres-provider-service';

export class BlogPostsTableService implements BlogPostsTableServiceInterface {
  private _repo: Repository<BlogPost>;

  constructor(postgresProviderService: DatabaseProvider<Sequelize>) {
    this._repo = postgresProviderService.connection.getRepository<BlogPost>(BlogPost);
  }

  public create(CreateBlogPostDTO: CreateBlogPostDTO): Promise<BlogPost> {
    return this._repo.create(CreateBlogPostDTO);
  }

  public findOne(id: number): Promise<BlogPost | null> {
    return this._repo.findOne({ where: { id }, include: [{ model: User }] });
  }
}

export interface BlogPostsTableServiceInterface {
  create(CreateBlogPostDTO: CreateBlogPostDTO): Promise<BlogPost>;
  findOne(id: number): Promise<BlogPost | null>;
}
