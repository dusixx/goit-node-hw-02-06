import { ctrlWrapper, ctrlWrapperAsync } from '../decorators/ctrlWrapper.js';
import { validateId } from './validateId.js';
import { authenticate } from './authenticate.js';
import { uploadSingleImage } from './upload.js';
import { cleanup } from '../decorators/cleanup.js';

export const mdw = {
  validateId: ctrlWrapperAsync(validateId),
  authenticate: ctrlWrapperAsync(authenticate),
  uploadSingleImage,
  cleanup,
};
