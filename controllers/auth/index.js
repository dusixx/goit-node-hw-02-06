import { ctrlWrapper } from '../../decorators/index.js';
import { signin } from './signin.js';
import { signup } from './signup.js';

export const ctrl = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
