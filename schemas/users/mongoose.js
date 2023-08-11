import { Schema } from 'mongoose';
import { VALIDATION_DATA } from '../../constants/index.js';
import { isValidEmail } from '../../helpers/index.js';

const { name, email } = VALIDATION_DATA;

const shape = Object.entries({ name, email }).reduce(
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
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    subscription: {
      type: String,
      enum: {
        values: ['starter', 'pro', 'business'],
        message: '{VALUE} is not supported',
      },
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  }
);

// email должен быть уникальным
shape.email.unique = true;

// для единообразия используем валидатор Joi
shape.email.validate.validator = isValidEmail;

console.log(shape);

export const schema = new Schema(shape, {
  versionKey: false,
  timestamps: true,
});

// schema.index({ email: 1 }, { unique: true });
