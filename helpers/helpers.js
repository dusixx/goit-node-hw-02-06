import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

export const genId = nanoid;

export const isStr = v => typeof v === 'string';

export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  alreadyExists: 409,
  invalidData: 422,
};

export const format = {
  name(v) {
    return isStr(v) ? v.replace(/\s*/, ' ').trim() : '';
  },

  email(v) {
    return isStr(v) ? v.trim() : '';
  },

  phone(v) {
    return isStr(v)
      ? v.replace(/[\s-]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      : '';
  },
};
