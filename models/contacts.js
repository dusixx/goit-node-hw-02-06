import { Schema, model } from 'mongoose';
import { handlePostSaveError, handlePreUpdateValidate } from './hooks.js';
import { VALIDATION } from '../constants/index.js';

//
// validation
//

const docShape = Object.entries(VALIDATION).reduce(
  (res, [key, value]) => {
    res[key] = {
      type: String,
      required: true,
      validate: {
        validator: v => value.pattern.test(v),
        message: () => value.message,
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

const contactSchema = new Schema(docShape, {
  versionKey: false,
  timestamps: true,
});

//
// hooks
//

contactSchema.pre('findOneAndUpdate', handlePreUpdateValidate);
contactSchema.post('findOneAndUpdate', handlePostSaveError);
contactSchema.post('save', handlePostSaveError);

export const Contact = model('contact', contactSchema);
