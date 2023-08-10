import { HTTP_STATUS } from '../../constants/index.js';
import { User } from '../../models/index.js';
import { HttpError, token, crypt } from '../../helpers/index.js';

const ERR_AUTH_FAILED = 'email or password is invalid';

// (!?) при повторных sigin выдается новый токен
// При этом все предыдущие - валидны
// Это, вероятно, не проблема и должно контролиться на фронте

export const signin = async ({ body }, res) => {
  const { email, password } = body;
  const foundUser = await User.findOne({ email });

  const success = await crypt.compare(password, foundUser?.password);
  if (!success) throw HttpError(HTTP_STATUS.unauth, ERR_AUTH_FAILED);

  res.json({ token: token.make(foundUser._id) });
};
