export class ApiResponseService implements ApiResponseServiceInterface {
  errorResponse<T>(error: string): ApiResponse<T> {
    return { state: RESPONSE_STATE.ERROR, error };
  }

  successResponse<T>(message: string, payload: T): ApiResponse<T> {
    return { state: RESPONSE_STATE.SUCCESS, message, payload };
  }
}

export enum RESPONSE_STATE {
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface ApiResponseServiceInterface {
  errorResponse<T>(error: string): ApiResponse<T>;

  successResponse<T>(message: string, payload: T): ApiResponse<T>;
}

export interface ErrorResponse {
  state: RESPONSE_STATE.ERROR;
  error: string;
}

export interface SuccessResponse<T> {
  state: RESPONSE_STATE.SUCCESS;
  message: string;
  payload: T;
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
