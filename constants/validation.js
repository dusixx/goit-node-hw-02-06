import { isValidEmail } from '../helpers/index.js';

export const JIMP_SUPPORTED_FORMATS = ['jpeg', 'png', 'bmp', 'tiff', 'gif'];
export const JIMP_SUPPORTED_EXTNAMES = [
  ...JIMP_SUPPORTED_FORMATS,
  'jpg',
  'tif',
];

export const REGEXP = {
  // email: /^\s*\S+@\S+\.\S+\s*$/,
  name: /^\s*[A-Z][a-z]+(\s+[A-Z][a-z]+)?\s*$/,
  phone: /^([\s-]*\d[\s-]*){10}$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  subscription: /^starter|pro|business$/,
  imageMimeType: RegExp(`^image\/(${JIMP_SUPPORTED_FORMATS.join('|')})$`, 'i'),
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
    normalizer: v => v.replace(/\s+/, ' '),
  },
  phone: {
    pattern: REGEXP.phone,
    message: [
      'Phone must be 10 digits long',
      'and may contain spaces and hyphens',
    ].join(' '),
    normalizer: v => v.replace(/[^\d]/g, ''),
  },
  email: {
    pattern: REGEXP.email,
    message: 'Invalid email',
    validator: isValidEmail,
    normalizer: v => v.toLowerCase(),
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
