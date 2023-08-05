import { nanoid } from 'nanoid';

export const genId = nanoid;

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
    return v ? String(v).replace(/\s*/, ' ').trim() : '';
  },

  email(v) {
    return v ? String(v).trim() : '';
  },

  phone(v) {
    return v
      ? String(v)
          .replace(/[\s-]/g, '')
          .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      : '';
  },
};
