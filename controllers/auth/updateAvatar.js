import { HTTP_STATUS } from '../../constants/index.js';
import { HttpError } from '../../helpers/index.js';
import { User } from '../../models/index.js';

export const updateAvatar = async ({ user, file }, res) => {
  if (!file) {
    throw HttpError(HTTP_STATUS.badRequest, 'avatar: need a file');
  }
  const { avatarUrl } = file;
  await User.findByIdAndUpdate(user._id, { avatarUrl });

  res.json({ avatarUrl });
};
