import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class Comment extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  public id?: number;

  @Column
  public blogPostId!: number;

  @Column
  public content!: string;

  @Column
  public userId!: number;

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;
}
