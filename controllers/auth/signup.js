import { HTTP_STATUS } from '../../constants/index.js';
import { crypt } from '../../helpers/index.js';
import { User } from '../../models/index.js';
import { moveAvatar } from '../../helpers/index.js';
import gravatar from 'gravatar';

export const signup = async (req, res) => {
  const { body, file: avatar = '' } = req;

  // хешируем пароль
  const password = await crypt.hash(body.password);

  // перемещаем аву из tmp в public или генерируем url, если не передана
  const avatarUrl =
    (await moveAvatar(avatar.filename)) ??
    gravatar.profile_url(body.email, { protocol: 'https', size: '250' });

  const { name, email } = await User.create({ ...body, password, avatarUrl });

  // не отправляем токен, нужно подтвердить актуальность email
  res.status(HTTP_STATUS.created).json({ name, email });
};
