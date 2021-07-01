import { NextFunction, Request, Response } from 'express';
import { CreateBlogPostDTO } from '../dtos';
import { BlogPost } from '../models';
import { BlogPostsTableServiceInterface } from '../services';
import { ApiResponseServiceInterface } from '../services/api-response-service/api-response-service';

export class BlogPostsController {
  constructor(
    private blogpostsTableService: BlogPostsTableServiceInterface,
    private apiService: ApiResponseServiceInterface
  ) {
  }

  public createBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const blogPost = await this.blogpostsTableService.create(new CreateBlogPostDTO(req.body));

    if (!blogPost) return next(new Error('error creating blogPost'));

    res.send(this.apiService.successResponse<BlogPost>('success', blogPost));
  };

  public getBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const blogPost = await this.blogpostsTableService.findOne(Number(req.params.id));

    if (!blogPost) return next(new Error('no blogPost!'));

    res.send(this.apiService.successResponse<BlogPost>('success', blogPost));
  };
}
