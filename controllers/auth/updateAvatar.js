import fs from 'fs/promises';
import path from 'path';
import { HTTP_STATUS } from '../../constants/index.js';
import { checkFileExists, HttpError } from '../../helpers/index.js';
import { User } from '../../models/index.js';

export const updateAvatar = async ({ user, file }, res) => {
  if (!file) {
    throw HttpError(HTTP_STATUS.badRequest, 'avatar: need a file');
  }

  const { avatarUrl } = file;
  const { avatarUrl: oldAvatarUrl } = await User.findByIdAndUpdate(user._id, {
    avatarUrl,
  });

  // удаляем старый аватар, если это не gravatar-ссылка
  // todo: 'avavatrs' 'public' надо вынести в константы
  // или задавать в конструктор new Avatar(..)
  if (oldAvatarUrl.startsWith('avatars')) {
    const fullName = path.resolve('public', oldAvatarUrl);
    try {
      await checkFileExists(fullName);
      await fs.unlink(fullName);
    } catch {}
  }

  res.json({ avatarUrl });
};
