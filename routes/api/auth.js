import express from 'express';
import {
  validateBody,
  handleError,
  uploadSingleImage,
} from '../../decorators/index.js';
import { joiSchema as schema } from '../../schemas/users/index.js';
import { ctrl } from '../../controllers/auth/index.js';
import { mdw } from '../../middlewares/index.js';
import fs from 'fs/promises';

const removeAvatar = async ({ file }) => {
  return file && (await fs.unlink(file.newPath || file.path));
};

export const router = express.Router();

router.post(
  /\/(signup|register)/,
  uploadSingleImage('avatar'),
  validateBody(schema.signup),
  mdw.isEmailExists,
  mdw.processAvatar,
  ctrl.signup,
  handleError(removeAvatar)
);

router.post(/\/(signin|login)/, validateBody(schema.signin), ctrl.signin);

router.post(/\/(signout|logout)/, mdw.authenticate, ctrl.signout);

router.get('/current', mdw.authenticate, ctrl.getCurrent);

router.patch(
  /\/(subscription|sub)/,
  mdw.authenticate,
  validateBody(schema.updateSubscription),
  ctrl.updateSubscription
);
