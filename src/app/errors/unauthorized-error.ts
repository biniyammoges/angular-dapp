import { AppError } from './app-error';

export class UnAuthorizedError extends AppError {
  constructor(originalError?: any) {
    super(originalError);
  }
}
