import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { joiSchema as schema } from '../../schemas/users/index.js';
import { ctrl } from '../../controllers/auth/index.js';
import { mdw } from '../../middlewares/index.js';

export const router = express.Router();

router.post(/\/(signup|register)/, validateBody(schema.signup), ctrl.signup);

router.post(/\/(signin|login)/, validateBody(schema.signin), ctrl.signin);

router.post(/\/(signout|logout)/, mdw.verifyToken, ctrl.signout);

router.get('/current', mdw.verifyToken, ctrl.getCurrent);

router.patch(
  /\/(subscription|sub)/,
  mdw.verifyToken,
  validateBody(schema.updateSubscription),
  ctrl.updateSubscription
);
