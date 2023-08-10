import { HTTP_STATUS } from '../../constants/index.js';
import { User } from '../../models/user.js';

export const signup = async (req, res) => {
  const { name, email } = await User.create(req.body);
  res.status(HTTP_STATUS.created).json({ name, email });
};
