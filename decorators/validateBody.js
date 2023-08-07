import { HttpError } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';

export const validateBody = schema => {
  return async (req, res, next) => {
    try {
      // сохраняем валидные поля для работы с ними в контроллере
      // (при частичном обновлении)
      req.validatedBody = await schema.validateAsync(req.body);
      next();
    } catch ({ message }) {
      next(HttpError(HTTP_STATUS.badRequest, message));
    }
  };
};
