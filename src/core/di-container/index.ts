import { Repository, Sequelize } from 'sequelize-typescript';
import { BlogPost, Comment, User } from '../../models';
import {
  BlogPostsTableService,
  BlogPostsTableServiceInterface,
  CommentsTableService,
  CommentsTableServiceInterface,
  PlackiService,
  PlackiServiceInterface,
  UsersTableService,
  UsersTableServiceInterface,
} from '../../services';

export class DiContainer implements DiContainerInterface {
  private static _instance?: DiContainer;

  private _postgres: Sequelize;

  private constructor() {
    this._postgres = new Sequelize('database', (process.env.USER as unknown) as string, '', {
      dialect: 'postgres',
      host: '127.0.0.1',
      logging: console.log,
      port: 5432,
    });
  }

  private _blogPostsTableService?: BlogPostsTableServiceInterface;

  public get blogPostsTableService(): BlogPostsTableServiceInterface {
    if (!this._blogPostsTableService) {
      const repo: Repository<BlogPost> = this._postgres.getRepository<BlogPost>(BlogPost);
      this._blogPostsTableService = new BlogPostsTableService(repo);
    }
    return this._blogPostsTableService;
  }

  private _commentsTableService?: CommentsTableServiceInterface;

  public get commentsTableService(): CommentsTableServiceInterface {
    if (!this._commentsTableService) {
      const repo: Repository<Comment> = this._postgres.getRepository<Comment>(Comment);
      this._commentsTableService = new CommentsTableService(repo);
    }
    return this._commentsTableService;
  }

  private _plackiService?: PlackiServiceInterface;

  public get plackiService(): PlackiServiceInterface {
    if (!this._plackiService) this._plackiService = new PlackiService();
    return this._plackiService;
  }

  private _usersTableService?: UsersTableServiceInterface;

  public get usersTableService(): UsersTableServiceInterface {
    if (!this._usersTableService) {
      const repo: Repository<User> = this._postgres.getRepository<User>(User);
      this._usersTableService = new UsersTableService(repo);
    }
    return this._usersTableService;
  }

  public static getInstance(): DiContainer {
    if (!this._instance) this._instance = new DiContainer();
    return this._instance;
  }

  public async init(): Promise<void> {
    await this._postgres.addModels([BlogPost, Comment, User]);
    await this._postgres.sync({
      force: true,
    });
  }
}

export interface DiContainerInterface {
  plackiService: PlackiServiceInterface;
  usersTableService: UsersTableServiceInterface;
}
