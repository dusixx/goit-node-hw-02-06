import { HTTP_STATUS } from '../constants/http.js';
import { token as jwt, HttpError, isLikeJWT } from '../helpers/index.js';
import { User } from '../models/user.js';

const AUTH_TYPE = 'Bearer';

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [authType, authToken] = authorization.split(/\s+/);

  if (authType === AUTH_TYPE && authToken) {
    const { id } = jwt.verify(authToken);

    if (id) {
      // если токен валиден и есть в БД для данного id,
      // считаем авторизацию успешной
      const user = (req.user = await User.findById(id));
      // if(user?.token === authToken) -> есть нюансы
      if (user?.token) return next();
    }
  }

  throw HttpError(HTTP_STATUS.unauth);
};

const token = jwt.create();
console.log(jwt.decode(token));