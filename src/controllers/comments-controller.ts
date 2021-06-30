import { Request, Response } from 'express';
import { CommentsTableServiceInterface } from '../services';

export class CommentsController {
  constructor(private commentsTableService: CommentsTableServiceInterface) {}

  public getComment = async (req: Request, res: Response): Promise<void> => {
    const user = await this.commentsTableService.findOne(Number(req.params.id));
    res.send(user);
  };
}
