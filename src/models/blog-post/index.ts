import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Comment } from '../comment';
import { User } from '../user';

@Table
export class BlogPost extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  public id!: number;

  @Column
  public content!: string;

  @HasMany(() => Comment)
  public comments?: Comment[];

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
