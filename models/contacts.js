import { Schema, model } from 'mongoose';
import { handlePostSaveError, handlePreUpdateValidate } from './hooks.js';
import { VALIDATION } from '../constants/index.js';

//
// validation
//

const { name, phone, email } = VALIDATION;

const validator = {
  phone: {
    type: String,
    required: true,
    validate: {
      validator: v => phone.pattern.test(v),
      message: () => phone.message,
    },
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: v => name.pattern.test(v),
      message: () => name.message,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: v => email.pattern.test(v),
      message: () => email.message,
    },
  },
  favorite: {
    type: Boolean,
    default: false,
  },
};

//
// schema
//

const contactSchema = new Schema(
  {
    name: validator.name,
    email: validator.email,
    phone: validator.phone,
    favorite: validator.favorite,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//
// hooks
//

contactSchema.pre('findOneAndUpdate', handlePreUpdateValidate);
contactSchema.post('findOneAndUpdate', handlePostSaveError);
contactSchema.post('save', handlePostSaveError);

export const Contact = model('contact', contactSchema);
