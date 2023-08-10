import Joi from 'joi';
import { VALIDATION_DATA } from '../../constants/index.js';

const PASSWORD_MIN_LEN = 6;
const { name, email, password } = VALIDATION_DATA;

const shape = {
  name: Joi.string()
    .pattern(name.pattern)
    .messages({ 'string.pattern.base': name.message })
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({ 'string.email': email.message })
    .required(),

  // string.min
  password: Joi.string().min(PASSWORD_MIN_LEN).required(),
};

export const schema = {
  signup: Joi.object(shape),
  signin: Joi.object({
    email: shape.email,
    // для signin убираем валидацию длинны пароля в целях безопасности
    password: Joi.string().required(),
  }),
};
