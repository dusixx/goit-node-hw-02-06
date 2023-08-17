import 'dotenv/config';
import path from 'path';
import { Avatar, HttpError } from '../helpers/index.js';
import { HTTP_STATUS, AVATAR_OPTIONS } from '../constants/index.js';

const { PUBLIC_DIR } = process.env;
const { width, height, dir: avatarsDir } = AVATAR_OPTIONS;

const AVATARS_PATH = path.join(PUBLIC_DIR, avatarsDir);

const RESIZE_OPTIONS = {
  width,
  height,
  jpeg: 60,
  cover: true,
  removeOriginal: true,
};

export const processAvatarFile = async (req, res, next) => {
  const { body, file } = req;
  const avatar = file && (await new Avatar(file.path));

  if (avatar) {
    await avatar.moveTo(AVATARS_PATH);

    try {
      await avatar.resize(RESIZE_OPTIONS);
    } catch {
      throw HttpError(
        HTTP_STATUS.unprocContent,
        `${file.fieldname}: possible broken bitmap`
      );
    } finally {
      // запоминаем новый путь к аве
      // Даже если возникла ошибка при ресайзе -
      // moveTo() уже отработает
      file.newPath = avatar.path;

      file.avatarUrl = path
        .join(avatarsDir, avatar.fileName)
        .replaceAll('\\', '/');
    }
  }

  next();
};
