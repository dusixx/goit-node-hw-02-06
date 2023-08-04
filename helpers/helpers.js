import { nanoid } from 'nanoid';
import Joi from 'joi';

export const getId = nanoid;

//////////////////
// validation
//////////////////

const message = {
  phone: 'Phone must be 10 digits long and may contain spaces and hyphens',

  name: [
    'First name and last name (optional)',
    'must contain only latin letters,',
    'start with a capital and',
    'be at least 2 characters long',
  ].join(' '),

  email: 'Invalid email',
};

const schemeObject = {
  name: Joi.string()
    .pattern(/^\s*[A-Z][a-z]+(\s*[A-Z][a-z]+)?\s*$/)
    .messages({ 'string.pattern.base': message.name }),

  phone: Joi.string()
    .pattern(/^([\s-]*\d[\s-]*){10}$/)
    .messages({ 'string.pattern.base': message.phone }),

  email: Joi.string().email({ minDomainSegments: 2 }),
};

// все поля обязательны
export const addedContactScheme = Joi.object(schemeObject).options({
  presence: 'required',
});

// минимум одно обязательное
export const updatedContactScheme = Joi.object(schemeObject)
  .or('name', 'phone', 'email')
  .messages({ 'object.missing': 'at least one field is required' });

//////////////////
// format
//////////////////

export const formatPhone = v =>
  String(v)
    .replace(/[\s-]/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

export const formatName = v => String(v).replace(/\s*/, ' ').trim();
