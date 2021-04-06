import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  public id!: number;
  @Column
  public email!: string;
  @Column
  public password!: string;
  @CreatedAt
  @Column
  public createdAt!: Date;
  @UpdatedAt
  @Column
  public updatedAt!: Date;
}
