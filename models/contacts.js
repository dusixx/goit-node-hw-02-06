import { Schema, model } from 'mongoose';
import { VALIDATION } from '../constants/index.js';
import { format } from '../helpers/utils.js';
import * as hook from './hooks.js';

//
// document shape
//

const docShape = Object.entries(VALIDATION).reduce(
  (res, [fieldName, { pattern, message }]) => {
    res[fieldName] = {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: v => pattern.test(v),
        //можно message: props => '${props.value} ...'
        message,
      },
      // (!!) сработает перед валидацией, надо чтобы до
      // set: format[fieldName],
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
const { name, email, phone } = docShape;
email.unique = phone.unique = true;

const contactSchema = new Schema(docShape, {
  versionKey: false,
  timestamps: true,
});

//
// hooks
//

// валидация при обновлении
contactSchema.pre('findOneAndUpdate', hook.handlePreUpdateValidate);

// форматирование перед сохранением
contactSchema.pre('save', hook.handlePreSaveFormatting);

// обработка ошибок при обновлении/добавлении
contactSchema.post('findOneAndUpdate', hook.handlePostSaveError);
contactSchema.post('save', hook.handlePostSaveError);

export const Contact = model('contact', contactSchema);
