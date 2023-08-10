import { Schema } from 'mongoose';
import { VALIDATION_DATA } from '../../constants/index.js';
import { isValidEmail } from '../../helpers/index.js';

const { name, phone, email } = VALIDATION_DATA;

const shape = Object.entries({ name, phone, email }).reduce(
  (res, [fieldName, { pattern, message }]) => {
    res[fieldName] = {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: v => pattern.test(v),
        message,
      },
    };
    return res;
  },
  {
    favorite: {
      type: Boolean,
      default: false,
    },
  }
);

// email и phone должны быть уникальными
shape.email.unique = shape.phone.unique = true;

// для единообразия используем валидатор Joi
shape.email.validate.validator = isValidEmail;

export const schema = new Schema(shape, {
  versionKey: false,
  timestamps: true,
});
