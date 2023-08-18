import { HTTP_STATUS, AVATAR_OPTIONS } from '../../constants/index.js';
import { User } from '../../models/index.js';
import { crypt, Avatar, sendVerificationEmail } from '../../helpers/index.js';

const { gravaTheme: theme, width: size } = AVATAR_OPTIONS;

export const signup = async ({ body, file }, res) => {
  const { name, email, password } = body;

  // создаем профиль пользователя
  const { avatarUrl } = await User.create({
    ...body,
    avatarUrl: Avatar.getGravatarUrl(email, { theme, size }),
    verificationCode: await sendVerificationEmail(email),
    password: await crypt.hash(password),
  });

  // не отправляем токен, нужно подтвердить актуальность email
  res.status(HTTP_STATUS.created).json({
    name,
    email,
    avatarUrl,
  });
};
