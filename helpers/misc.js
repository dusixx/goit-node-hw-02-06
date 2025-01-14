import Joi from 'joi';
import fs from 'fs/promises';

export const isStr = v => typeof v === 'string';
export const isFunc = v => typeof v === 'function';
export const isNum = v => !isNaN(v - parseFloat(v));

// joi-валидатор для email
export const isValidEmail = (v, options = { minDomainSegments: 2 }) => {
  const { error } = Joi.string().email(options).validate(v);
  return !error;
};

export const detailErrorMessage = ({ method, url } = {}, message) => {
  return { path: `${method} ${url}`, message };
};

// добавлят вызов trim() всем строковым полям
export const setJoiShapeTrimAll = shape => {
  Object.entries(shape).forEach(([key, field]) => {
    if (field.type === 'string') shape[key] = field.trim();
  });
};

// добавлят свойство { trim: true } всем строковым полям
export const setMongooseShapeTrimAll = shape => {
  Object.entries(shape).forEach(([, field]) => {
    if (field.type === String) field.trim = true;
  });
};

export const checkFileExists = async path => {
  try {
    (await fs.stat(path)).isFile();
  } catch (err) {
    if (err.code === 'ENOENT') throw err;
  }
};
