import { HttpError } from '../helpers/index.js';
import { User } from '../models/index.js';
import { HTTP_STATUS } from '../constants/index.js';

const ERR_ALREADY_EXISTS = 'User with same email is already exists';

export const isEmailExists = async ({ body: { email } }, res, next) => {
  if (await User.findOne({ email })) {
    throw HttpError(HTTP_STATUS.conflict, ERR_ALREADY_EXISTS);
  }
  next();
};
