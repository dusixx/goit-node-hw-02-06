import Joi from 'joi';
import { VALIDATION_DATA } from '../../constants/index.js';
import { setJoiShapeTrimAll } from '../../helpers/index.js';

const PASSWORD_MIN_LEN = 6;
const { name, email, subscription } = VALIDATION_DATA;

// (!) token приходит в заголовке, а не в body
// Тут он не нужен

const shape = {
  name: Joi.string()
    .pattern(name.pattern)
    .messages({ 'string.pattern.base': name.message })
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({ 'string.email': email.message })
    .required(),

  password: Joi.string().min(PASSWORD_MIN_LEN).required(),

  subscription: Joi.string()
    .pattern(subscription.pattern)
    .messages({ 'string.pattern.base': subscription.message })
    .default(subscription.default),
};

// добавляем trim всем строковым полям
setJoiShapeTrimAll(shape);

export const schema = {
  signup: Joi.object(shape),
  signin: Joi.object({
    email: shape.email,
    // убираем валидацию длинны пароля в целях безопасности
    password: Joi.string().trim().required(),
  }),
  updateSubscription: Joi.object({
    subscription: Joi.string()
      .pattern(subscription.pattern)
      .messages({ 'string.pattern.base': subscription.message })
      .required()
      .trim(),
  }),
  verifyEmail: Joi.object({
    email: shape.email,
  }),
};
