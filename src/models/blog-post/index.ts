import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from '../user';

@Table
export class BlogPost extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  public id?: number;

  @Column
  public content!: string;

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
