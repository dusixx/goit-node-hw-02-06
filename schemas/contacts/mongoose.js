import { Schema } from 'mongoose';
import { VALIDATION_DATA } from '../../constants/index.js';
import { isValidEmail } from '../../helpers/index.js';

const { name, phone, email } = VALIDATION_DATA;
const { ObjectId } = Schema.Types;

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
    owner: {
      type: ObjectId,
      ref: 'users',
      required: true,
    },
  }
);

// email и phone должны быть уникальными
// (!!) upd: у разных owner контакты могут повторяться
// Таким образом, глобально в коллекции contacts могут быть дубли
// НЕ должны дублироваться контакты у одного и того же owner
// shape.email.unique = shape.phone.unique = true;

// для единообразия используем валидатор Joi
shape.email.validate.validator = isValidEmail;

export const schema = new Schema(shape, {
  versionKey: false,
  timestamps: true,
});
