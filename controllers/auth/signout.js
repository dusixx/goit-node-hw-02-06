import { HTTP_STATUS } from '../../constants/http.js';
import { User } from '../../models/index.js';

export const signout = async ({ user }, res) => {
  const { _id: id } = user;
  await User.findByIdAndUpdate(id, { token: null });

  // res.status(HTTP_STATUS.noContent).json();
  res.json({ message: 'Successfully' });
};