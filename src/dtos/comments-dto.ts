export class CreateCommentDTO {
  public readonly blogPostId: number;
  public readonly content: string;
  public readonly userId: number;

  constructor({ blogPostId, content, userId }: CreateCommentProperties) {
    this.blogPostId = blogPostId;
    this.content = content;
    this.userId = userId;
  }
}

type CreateCommentProperties = {
  blogPostId: number;
  content: string;
  userId: number;
};

export class CommentResponseDTO {
  public readonly blogPostId: number;
  public readonly content: string;
  public readonly createdAt: Date;
  public readonly id: number;
  public readonly updatedAt: Date;
  public readonly userId: number;

  constructor({ blogPostId, content, createdAt, id, updatedAt, userId }: CommentResponseProperties) {
    this.blogPostId = blogPostId;
    this.content = content;
    this.createdAt = createdAt;
    this.id = id;
    this.updatedAt = updatedAt;
    this.userId = userId;
  }
}

export type CommentResponseProperties = {
  blogPostId: number;
  content: string;
  createdAt: Date;
  id: number;
  updatedAt: Date;
  userId: number;
};
