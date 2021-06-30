import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { CreateUserDTO, UsersTableServiceInterface } from '../services';
import { ApiResponseServiceInterface } from '../services/api-response-service/api-response-service';

export class UsersController {
  constructor(private usersTableService: UsersTableServiceInterface, private apiService: ApiResponseServiceInterface) {}

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await this.usersTableService.create(new CreateUserDTO(req.body));

    if (!user) return next(new Error('no user!'));

    res.send(this.apiService.successResponse<User>('success', user));
  };

  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await this.usersTableService.findOne(Number(req.params.id));

    if (!user) return next(new Error('no user!'));

    res.send(this.apiService.successResponse<User>('success', user));
  };
}
