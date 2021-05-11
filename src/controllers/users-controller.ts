import { Request, Response } from 'express';
import { UsersTableServiceInterface } from '../services';

export class UsersController {
  constructor(private usersTableService: UsersTableServiceInterface) {}

  public getUser = async (req: Request, res: Response): Promise<void> => {
    const user = await this.usersTableService.findOne(Number(req.params.id));
    res.send(user);
  };
}
