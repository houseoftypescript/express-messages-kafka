import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';
import log from '../../libs/log';

export const errorHandler = (
  error: Error | ValidateError | undefined,
  _request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (error instanceof ValidateError) {
    log.error('ValidateError', error);
    return response.status(422).json({
      message: 'Validation Failed',
      details: error.fields,
    });
  }

  if (error instanceof Error) {
    log.error('Error', error);
    return response.status(500).json({
      message: error.message || 'Internal Server Error',
    });
  }

  if (error) {
    log.error('FallbackError', error);
    return response.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
};
