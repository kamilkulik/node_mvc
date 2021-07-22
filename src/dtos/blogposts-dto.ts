export class CreateBlogPostDTO {
  public readonly content: string;
  public readonly userId: string;

  constructor({ content, userId }: CreateBlogPostProperties) {
    this.content = content;
    this.userId = userId;
  }
}

export type CreateBlogPostProperties = {
  content: string;
  userId: string;
};

export class BlogPostResponseDTO {
  public readonly id: number;
  public readonly content: string;
  public readonly comments: any;
  public readonly userId: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor({ id, content, comments, userId, createdAt, updatedAt }: BlogPostResponseProperties) {
    this.id = id;
    this.content = content;
    this.comments = comments;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export type BlogPostResponseProperties = {
  id: number;
  content: string;
  comments?: any;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};
