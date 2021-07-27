import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO, UserResponseDTO } from '../dtos';
import { User } from '../models';
import { MapperService, UsersTableServiceInterface } from '../services';
import { ApiResponseServiceInterface } from '../services/api-response-service/api-response-service';

export class UsersController {
  constructor(
    private usersTableService: UsersTableServiceInterface,
    private apiService: ApiResponseServiceInterface,
    private mapper: MapperService
  ) {
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userProperties = this.mapper.map<any, CreateUserDTO>(req.body, CreateUserDTO);
      const user = await this.usersTableService.create(userProperties);
      const response = this.mapper.map<User, UserResponseDTO>(user, UserResponseDTO);
      res.send(this.apiService.successResponse<UserResponseDTO>('success', response));
    } catch (error) {
      next(error);
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.usersTableService.findOne(Number(req.params.id));

      if (!user) {
        res.send(this.apiService.errorResponse('Error: no User'));
        return;
      }

      res.send(this.apiService.successResponse<UserResponseDTO>('success', new UserResponseDTO(user)));
    } catch (error) {
      next(error);
    }
  }
}

// HOMEWORK

// create a MapperServiceInterface
