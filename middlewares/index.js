import { ctrlWrapperAsync } from '../decorators/ctrlWrapper.js';
import { validateId } from './validateId.js';
import { verifyToken } from './verifyToken.js';

export const mdw = {
  validateId: ctrlWrapperAsync(validateId),
  verifyToken: ctrlWrapperAsync(verifyToken),
};
