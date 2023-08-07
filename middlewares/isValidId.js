import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';

export const isValidId = ({ params }, res, next) => {
  const { id } = params;
  return isValidObjectId(id)
    ? next()
    : next(HttpError(HTTP_STATUS.badRequest, `${id} is not a valid id`));
};
