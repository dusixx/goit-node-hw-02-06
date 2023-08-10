import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { joiSchema as schema } from '../../schemas/users/index.js';
import { ctrl } from '../../controllers/auth/index.js';

export const router = express.Router();

router.post('/signup', validateBody(schema.signup), ctrl.signup);

router.post('/signin', validateBody(schema.signin), ctrl.signin);
