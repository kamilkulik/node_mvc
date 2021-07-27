import { NextFunction, Request, Response } from 'express';
import { CreateCommentDTO, CommentResponseDTO } from '../dtos';
import { Comment } from '../models';
import { CommentsTableServiceInterface } from '../services';
import { ApiResponseServiceInterface } from '../services/api-response-service';

export class CommentsController {
  constructor(
    private commentsTableService: CommentsTableServiceInterface,
    private apiService: ApiResponseServiceInterface
  ) {}

  public createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const comment = await this.commentsTableService.create(new CreateCommentDTO(req.body));

      res.send(this.apiService.successResponse<CommentResponseDTO>('success', new CommentResponseDTO(comment)));
    } catch (error) {
      next(error);
    }
  };

  public getComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const comment = await this.commentsTableService.findOne(Number(req.params.id));

      res.send(
        this.apiService.successResponse<CommentResponseDTO>('success', new CommentResponseDTO(comment as Comment))
      );
    } catch (error) {
      next(error);
    }
  };
}
