import { isStr } from './utils.js';

const formatName = v => (isStr(v) ? v.replace(/\s+/, ' ').trim() : '');
const formatEmail = v => (isStr(v) ? v.trim().toLowerCase() : '');
const formatPhone = v => {
  isStr(v)
    ? v.replace(/[\s-]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    : '';
};

export const format = {
  name: formatName,
  email: formatEmail,
  phone: formatPhone,
};
