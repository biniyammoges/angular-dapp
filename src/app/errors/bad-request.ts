import { AppError } from './app-error';

export class BadRequestError extends AppError {
  constructor(originalError?: any) {
    super(originalError);
  }
}
