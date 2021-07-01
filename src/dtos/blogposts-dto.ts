export class CreateBlogPostDTO {
  public readonly content: string;
  public readonly UserId: string;

  constructor(d: { content: string; UserId: string }) {
    this.content = d.content;
    this.UserId = d.UserId;
  }
}
