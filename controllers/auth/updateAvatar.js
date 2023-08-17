import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { HttpError } from '../../helpers/index.js';
import { User } from '../../models/index.js';
import { HTTP_STATUS, AVATAR_OPTIONS } from '../../constants/index.js';

const { PUBLIC_DIR: publicDir } = process.env;
const { dir: avatarsDir } = AVATAR_OPTIONS;

export const updateAvatar = async ({ user, file }, res) => {
  if (!file) {
    throw HttpError(HTTP_STATUS.badRequest, 'avatar: need a file');
  }

  // обновляем ссылку в БД
  const { avatarUrl } = file;
  const { avatarUrl: oldAvatarUrl } = await User.findByIdAndUpdate(user._id, {
    avatarUrl,
  });

  // удаляем старый аватар, если это не gravatar-ссылка
  if (oldAvatarUrl.startsWith(avatarsDir)) {
    const fullName = path.resolve(publicDir, oldAvatarUrl);
    try {
      await fs.unlink(fullName);
    } catch {}
  }

  res.json({ avatarUrl });
};
