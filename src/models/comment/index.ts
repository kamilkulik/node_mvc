import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { BlogPost } from '../blog-post';
import { User } from '../user';

@Table
export class Comment extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  public id?: number;

  @Column
  public content!: string;

  @ForeignKey(() => BlogPost)
  @Column
  public blogPostId!: number;

  @BelongsTo(() => BlogPost)
  public blogPost!: BlogPost;

  @ForeignKey(() => User)
  @Column
  public userId!: number;

  @BelongsTo(() => User)
  public user!: User;

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;
}
