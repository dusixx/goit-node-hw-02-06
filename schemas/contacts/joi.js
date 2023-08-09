import Joi from 'joi';
import { VALIDATION } from '../../constants/index.js';

const { name, phone, email } = VALIDATION;

const shape = {
  name: Joi.string()
    .pattern(name.pattern)
    .messages({ 'string.pattern.base': name.message })
    .required(),

  phone: Joi.string()
    .pattern(phone.pattern)
    .messages({ 'string.pattern.base': phone.message })
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({ 'string.email': email.message })
    .required(),

  favorite: Joi.boolean().default(false),
};

export const schema = {
  add: Joi.object(shape),
  updateStatus: Joi.object({
    favorite: Joi.boolean().required(),
  }),
};

// все поля обязательны
// export const contactAddSchema = Joi.object(schemeObject).options({
//   presence: 'required',
// });

// минимум одно обязательное
// export const updatedContactScheme = Joi.object(schemeObject)
//   .or(...Object.keys(schemeObject))
//   .messages({ 'object.missing': 'At least one field is required' });
