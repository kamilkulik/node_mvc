import { Request, Response } from 'express';
import { BlogPostsTableServiceInterface } from '../services';

export class BlogPostsController {
  constructor(private blogpostsTableService: BlogPostsTableServiceInterface) {}

  public getBlogPost = async (req: Request, res: Response): Promise<void> => {
    const user = await this.blogpostsTableService.findOne(Number(req.params.id));
    res.send(user);
  };
}
