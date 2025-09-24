import type { Request, Response, NextFunction } from 'express';
import { validateClimateDocument } from '../validation/climateValidation';
import config from '../config';

export const climateValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  validateClimateDocument(config.climateValidation)(req, res, next);
};
