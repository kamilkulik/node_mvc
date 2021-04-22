import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class BlogPost extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  public id?: number;

  @Column
  public content!: string;

  @Column
  public userId!: string;

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;
}
