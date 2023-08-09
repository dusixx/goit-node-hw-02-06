import { model } from 'mongoose';
import * as hook from './hooks.js';
import { schema } from '../schemas/contacts/index.js';

const { mongoose: mongooseSchema } = schema;

// валидация при обновлении
mongooseSchema.pre('findOneAndUpdate', hook.handlePreUpdateValidate);

// форматирование перед сохранением
mongooseSchema.pre('save', hook.handlePreSaveFormatting);

// обработка ошибок при обновлении/добавлении
mongooseSchema.post('findOneAndUpdate', hook.handlePostSaveError);
mongooseSchema.post('save', hook.handlePostSaveError);

export const Contact = model('contact', mongooseSchema);
