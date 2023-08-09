import { Schema } from 'mongoose';
import { VALIDATION } from '../../constants/index.js';

const shape = Object.entries(VALIDATION).reduce(
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
const { email, phone } = shape;
email.unique = phone.unique = true;

export const schema = new Schema(shape, {
  versionKey: false,
  timestamps: true,
});
