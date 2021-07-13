import { NextFunction, Request, Response } from 'express';
import { CreateBlogPostDTO } from '../dtos';
import { BlogPost } from '../models';
import { BlogPostsTableServiceInterface } from '../services';
import { ApiResponseServiceInterface } from '../services/api-response-service/api-response-service';

export class BlogPostsController {
  constructor(
    private blogpostsTableService: BlogPostsTableServiceInterface,
    private apiService: ApiResponseServiceInterface
  ) {}

  public createBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const blogPost = await this.blogpostsTableService.create(new CreateBlogPostDTO(req.body));

      res.send(this.apiService.successResponse<BlogPost>('success', blogPost));
    } catch (error) {
      next(error);
    }
  };

  public getBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const blogPost = await this.blogpostsTableService.findOne(Number(req.params.id));

      res.send(this.apiService.successResponse<BlogPost>('success', blogPost as BlogPost));
    } catch (error) {
      next(error);
    }
  };
}
