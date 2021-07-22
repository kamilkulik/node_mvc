import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO, UserResponseDTO } from '../dtos';
import { User } from '../models';
import { UsersTableServiceInterface } from '../services';
import { ApiResponseServiceInterface } from '../services/api-response-service/api-response-service';

export class UsersController {
  constructor(private usersTableService: UsersTableServiceInterface, private apiService: ApiResponseServiceInterface) {
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.usersTableService.create(new CreateUserDTO(req.body));

      res.send(this.apiService.successResponse<UserResponseDTO>('success', new UserResponseDTO(user)));
    } catch (error) {
      next(error);
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.usersTableService.findOne(Number(req.params.id));

      res.send(this.apiService.successResponse<User>('success', user as User));
    } catch (error) {
      next(error);
    }
  }
}
