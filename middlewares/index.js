import { ctrlWrapper } from '../decorators/ctrlWrapper.js';
import { validateId } from './validateId.js';
import { verifyToken } from './verifyToken.js';

export const mdw = {
  validateId: ctrlWrapper(validateId),
  verifyToken: ctrlWrapper(verifyToken),
};
