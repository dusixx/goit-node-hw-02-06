import { HttpError, HTTP_STATUS } from '../helpers/index.js';

export const validateBody = schema => {
  return async (req, res, next) => {
    try {
      // сохраняем валидные поля для работы с ними в контроллере
      req.validatedBody = await schema.validateAsync(req.body);
      next();
    } catch ({ message }) {
      next(HttpError(HTTP_STATUS.badRequest, message));
    }
  };
};
