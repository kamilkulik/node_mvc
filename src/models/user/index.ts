import { Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { BlogPost } from '../blog-post';
import { Comment } from '../comment';

@Table
export class User extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  public id!: number;

  @Column({
    unique: true,
  })
  public email!: string;

  @Column
  public password!: string;

  @HasMany(() => BlogPost)
  public blogPosts?: BlogPost[];

  @HasMany(() => Comment)
  public comments?: Comment[];

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;
}
