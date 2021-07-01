export class CreateCommentDTO {
  public readonly blogPostId: number;
  public readonly content: string;
  public readonly userId: number;

  constructor(d: { blogPostId: number; content: string; userId: number }) {
    this.blogPostId = d.blogPostId;
    this.content = d.content;
    this.userId = d.userId;
  }
}
