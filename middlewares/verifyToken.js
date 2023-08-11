import { HTTP_STATUS } from '../constants/http.js';
import { token, HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/ctrlWrapper.js';
import { User } from '../models/user.js';

const AUTH_TYPE = 'Bearer';

const _verify = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [authType, authToken] = authorization.split(/\s+/);

  if (authType === AUTH_TYPE) {
    const { id } = token.verify(authToken);
    if (id && User.findById(id)) {
      // запоминаем id юзера, сделавшего текущий запрос
      return (req.userId = id) && next();
    }
  }

  throw HttpError(HTTP_STATUS.unauth);
};

export const verifyToken = ctrlWrapper(_verify);
