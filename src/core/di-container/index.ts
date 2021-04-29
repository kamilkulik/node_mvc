import {
  BlogPostsTableService,
  BlogPostsTableServiceInterface,
  CommentsTableService,
  CommentsTableServiceInterface,
  DatabaseProvider,
  PlackiService,
  PlackiServiceInterface,
  UsersTableService,
  UsersTableServiceInterface,
} from '../../services';
import { Repository, Sequelize } from 'sequelize-typescript';
import { BlogPost, Comment, User } from '../../models';

export class DiContainer implements DiContainerInterface {
  private _postgres: Sequelize;

  private _blogPostsTableService?: BlogPostsTableServiceInterface;
  private _commentsTableService?: CommentsTableServiceInterface;
  private _plackiService?: PlackiServiceInterface;
  private _usersTableService?: UsersTableServiceInterface;

  constructor(postgres: DatabaseProvider<Sequelize>) {
    this._postgres = postgres.connection;
  }

  public get blogPostsTableService(): BlogPostsTableServiceInterface {
    if (!this._blogPostsTableService) {
      const repo: Repository<BlogPost> = this._postgres.getRepository<BlogPost>(BlogPost);
      this._blogPostsTableService = new BlogPostsTableService(repo);
    }
    return this._blogPostsTableService;
  }

  public get commentsTableService(): CommentsTableServiceInterface {
    if (!this._commentsTableService) {
      const repo: Repository<Comment> = this._postgres.getRepository<Comment>(Comment);
      this._commentsTableService = new CommentsTableService(repo);
    }
    return this._commentsTableService;
  }

  public get plackiService(): PlackiServiceInterface {
    if (!this._plackiService) this._plackiService = new PlackiService();
    return this._plackiService;
  }

  public get usersTableService(): UsersTableServiceInterface {
    if (!this._usersTableService) {
      const repo: Repository<User> = this._postgres.getRepository<User>(User);
      this._usersTableService = new UsersTableService(repo);
    }
    return this._usersTableService;
  }
}

export interface DiContainerInterface {
  plackiService: PlackiServiceInterface;
  usersTableService: UsersTableServiceInterface;
}
