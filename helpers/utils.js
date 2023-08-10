import Joi from 'joi';

export const isStr = v => typeof v === 'string';

// email joi-валидатор
export const isValidEmail = (v, options = { minDomainSegments: 2 }) => {
  const { error } = Joi.string().email(options).validate(v);
  return !error;
};
