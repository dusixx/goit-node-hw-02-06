import { crypt, Avatar } from '../../helpers/index.js';
import { HTTP_STATUS, AVATAR_OPTIONS } from '../../constants/index.js';
import { User } from '../../models/index.js';

const { theme, size } = AVATAR_OPTIONS;

export const signup = async ({ body, file }, res) => {
  const { name, email, password } = body;

  // ексли файл аватара не загружен, генерируем gravatar
  const avatarUrl =
    file?.avatarUrl ?? Avatar.getGravatarUrl(email, { theme, size });

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
