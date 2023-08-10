import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';

export const validateId = ({ params: { id } }, res, next) =>
  next(
    isValidObjectId(id)
      ? null
      : HttpError(HTTP_STATUS.badRequest, `${id} is not a valid id`)
  );
