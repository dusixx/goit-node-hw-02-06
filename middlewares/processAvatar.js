import path from 'path';
import { Avatar } from '../helpers/index.js';

const AVATARS_PATH = 'public/avatars';
const AVATAR_SIZE = 250;

const DEF_RESIZE_OPTIONS = {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  jpeg: 60,
  cover: true,
  removeOriginal: true,
};

export const processAvatar = async ({ body, file }, res, next) => {
  const avatar = file && (await new Avatar(file.path));

  if (avatar) {
    await avatar.moveTo(AVATARS_PATH);
    try {
      await avatar.resize(DEF_RESIZE_OPTIONS);
    } catch {
      throw HttpError(
        HTTP_STATUS.unprocContent,
        `${file.fieldname}: possible broken bitmap`
      );
    }
    file.newPath = avatar.path;
  }

  file.avatarUrl = avatar
    ? path.join('avatars', avatar.fileName)
    : Avatar.getGravatarUrl(body.email, { size: AVATAR_SIZE });

  next();
};
