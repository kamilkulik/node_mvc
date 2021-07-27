import { NextFunction, Request, Response } from 'express';
import { CreateBlogPostDTO, BlogPostResponseDTO } from '../dtos';
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

      res.send(this.apiService.successResponse<BlogPostResponseDTO>('success', new BlogPostResponseDTO(blogPost)));
    } catch (error) {
      next(error);
    }
  };

  public getBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const blogPost = await this.blogpostsTableService.findOne(Number(req.params.id));

      if (!blogPost) {
        res.send(this.apiService.errorResponse('Error: no BlogPost'));
        return;
      }

      res.send(this.apiService.successResponse<BlogPostResponseDTO>('success', new BlogPostResponseDTO(blogPost)));
    } catch (error) {
      next(error);
    }
  };
}
