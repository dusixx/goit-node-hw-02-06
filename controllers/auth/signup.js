import { crypt } from '../../helpers/index.js';
import { HTTP_STATUS } from '../../constants/index.js';
import { User } from '../../models/index.js';

export const signup = async ({ body, file = '' }, res) => {
  const { name, email, password } = body;
  const { avatarUrl } = file;

  // создаем профиль пользователя
  await User.create({
    ...body,
    password: await crypt.hash(password),
    avatarUrl,
  });

  // не отправляем токен, нужно подтвердить актуальность email
  res.status(HTTP_STATUS.created).json({
    name,
    email,
    avatarUrl,
  });
};
