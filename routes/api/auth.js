import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { joiSchema as schema } from '../../schemas/users/index.js';
import { ctrl } from '../../controllers/auth/index.js';
import { mdw } from '../../middlewares/index.js';
import fs from 'fs/promises';

const removeAvatarTmp = async ({ file }) => {
  return file && (await fs.unlink(file.path));
};

export const router = express.Router();

router.post(
  /\/(signup|register)/,
  mdw.uploadSingleImage('avatar'),
  validateBody(schema.signup),
  ctrl.signup,
  // удаляем аватар из tmp, если невалидно body
  // или при добавлении в БД обнаружены дубли
  mdw.cleanup(removeAvatarTmp)
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
