import path from 'path';
import { Avatar, HttpError } from '../helpers/index.js';
import { HTTP_STATUS, AVATAR_OPTIONS } from '../constants/index.js';

const { size } = AVATAR_OPTIONS;

const RESIZE_OPTIONS = {
  width: size,
  height: size,
  jpeg: 60,
  cover: true,
  removeOriginal: true,
};

export const processAvatarFile = async (req, res, next) => {
  const { body, file } = req;
  const avatar = file && (await new Avatar(file.path));

  if (avatar) {
    await avatar.moveTo(AVATAR_OPTIONS.publicPath);
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
      file.avatarUrl = path.join('avatars', avatar.fileName);
    }
  }

  next();
};
