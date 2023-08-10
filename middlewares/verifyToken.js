import { HTTP_STATUS } from '../constants/http.js';
import { token, HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/ctrlWrapper.js';
import { User } from '../models/user.js';

const AUTH_TYPE = 'Bearer';

const _verify = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [authType, tokenStr] = authorization.split(/\s+/);

  if (authType === AUTH_TYPE) {
    const { id } = token.verify(tokenStr);
    if (id && User.findById(id)) return next();
  }

  throw HttpError(HTTP_STATUS.unauth);
};

export const verifyToken = ctrlWrapper(_verify);
