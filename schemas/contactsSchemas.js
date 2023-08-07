import Joi from 'joi';
import { VALIDATION } from '../constants/index.js';

const { name, phone, email } = VALIDATION;

const schemeObject = {
  name: Joi.string()
    .pattern(name.pattern)
    .messages({ 'string.pattern.base': name.message }),

  phone: Joi.string()
    .pattern(phone.pattern)
    .messages({ 'string.pattern.base': phone.message }),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({ 'string.email': email.message }),
};

// все поля обязательны
export const contactAddSchema = Joi.object(schemeObject).options({
  presence: 'required',
});

// favorite обязательное
export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// минимум одно обязательное
// export const updatedContactScheme = Joi.object(schemeObject)
//   .or(...Object.keys(schemeObject))
//   .messages({ 'object.missing': 'At least one field is required' });
