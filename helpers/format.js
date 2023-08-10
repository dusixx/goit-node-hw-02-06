import { isStr } from './utils.js';

export const format = {
  name(v) {
    return isStr(v) ? v.replace(/\s+/, ' ').trim() : '';
  },
  email(v) {
    return isStr(v) ? v.trim().toLowerCase() : '';
  },
  phone(v) {
    return isStr(v)
      ? v.replace(/[\s-]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      : '';
  },
};
