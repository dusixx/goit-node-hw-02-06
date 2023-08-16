import path from 'path';
import { Avatar, GRAVATAR, HttpError } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';

const AVATAR_SIZE = 250;

const AVATAR_OPTIONS = {
  publicPath: 'public/avatars',
  size: AVATAR_SIZE,
  theme: GRAVATAR.theme.robot,
};

const RESIZE_OPTIONS = {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  jpeg: 60,
  cover: true,
  removeOriginal: true,
};

export const processAvatar = async ({ body, file }, res, next) => {
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
    }
    file.newPath = avatar.path;
  }

  file.avatarUrl = avatar
    ? path.join('avatars', avatar.fileName)
    : Avatar.getGravatarUrl(body.email, AVATAR_OPTIONS);

  next();
};
