import { validateId } from './validateId.js';
import { authenticate } from './authenticate.js';
import { isUserExists } from './isUserExists.js';
import { processAvatar } from './processAvatar.js';
import { removeAvatar } from './removeAvatar.js';
import {
  ctrlWrapper,
  ctrlWrapperAsync,
  handleError,
} from '../decorators/index.js';

export const mdw = {
  validateId: ctrlWrapperAsync(validateId),
  authenticate: ctrlWrapperAsync(authenticate),
  isUserExists: ctrlWrapperAsync(isUserExists),
  processAvatar: ctrlWrapperAsync(processAvatar),
  removeAvatar: handleError(removeAvatar),
};
