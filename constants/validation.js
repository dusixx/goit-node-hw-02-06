import { isValidEmail } from '../helpers/index.js';

const REGEXP = {
  name: /^\s*[A-Z][a-z]+(\s+[A-Z][a-z]+)?\s*$/,
  phone: /^([\s-]*\d[\s-]*){10}$/,
  // email: /^\s*\S+@\S+\.\S+\s*$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  subscription: /^starter|pro|business$/,
};

export const VALIDATION_DATA = {
  name: {
    pattern: REGEXP.name,
    message: [
      'First name and last name (optional)',
      'must contain only latin letters,',
      'start with a capital',
      'and be at least 2 characters long',
    ].join(' '),
  },
  phone: {
    pattern: REGEXP.phone,
    message: [
      'Phone must be 10 digits long',
      'and may contain spaces and hyphens',
    ].join(' '),
  },
  email: {
    pattern: REGEXP.email,
    message: 'Invalid email',
    validator: isValidEmail,
  },
  subscription: {
    pattern: REGEXP.subscription,
    message: 'Invalid subscription type',
    default: 'starter',
  },
  favorite: {
    default: false,
  },
  token: {
    default: null,
  },
};
