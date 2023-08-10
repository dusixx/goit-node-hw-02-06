import { model } from 'mongoose';
import { hook } from './hooks.js';
import { mongooseSchema as schema } from '../schemas/users/index.js';

// валидация при обновлении
schema.pre('findOneAndUpdate', hook.handlePreUpdateValidate);

// форматирование перед сохранением
schema.pre('save', hook.handlePreSaveFormatting);

// обработка ошибок при обновлении и добавлении
schema.post('findOneAndUpdate', hook.handlePostSaveError);
schema.post('save', hook.handlePostSaveError);

export const User = model('users', schema);
