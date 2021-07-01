import { Repository, Sequelize } from 'sequelize-typescript';
import { CreateCommentDTO } from '../../dtos';
import { Comment } from '../../models';
import { DatabaseProvider } from '../postgres-provider-service';

export class CommentsTableService implements CommentsTableServiceInterface {
  private _repo: Repository<Comment>;

  constructor(postgresProviderService: DatabaseProvider<Sequelize>) {
    this._repo = postgresProviderService.connection.getRepository<Comment>(Comment);
  }

  public create(CreateCommentDTO: CreateCommentDTO): Promise<Comment> {
    return this._repo.create(CreateCommentDTO);
  }

  public findOne(id: number): Promise<Comment | null> {
    return this._repo.findOne({ where: { id } });
  }
}

export interface CommentsTableServiceInterface {
  create(CreateCommentDTO: CreateCommentDTO): Promise<Comment>;
  findOne(id: number): Promise<Comment | null>;
}
