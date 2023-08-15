import { ctrlWrapper, ctrlWrapperAsync } from '../decorators/ctrlWrapper.js';
import { validateId } from './validateId.js';
import { authenticate } from './authenticate.js';
import { isEmailExists } from './isEmailExists.js';
import { processAvatar } from './processAvatar.js';

export const mdw = {
  validateId: ctrlWrapperAsync(validateId),
  authenticate: ctrlWrapperAsync(authenticate),
  isEmailExists: ctrlWrapperAsync(isEmailExists),
  processAvatar: ctrlWrapperAsync(processAvatar),
};
