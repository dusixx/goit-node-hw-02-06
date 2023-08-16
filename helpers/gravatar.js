import { getHash as md5 } from './index.js';

export const GRAVATAR = {
  baseUrl: 'https://www.gravatar.com',
  theme: {
    noImage: 404,
    anonymous: 'mp',
    geometric: 'identicon',
    monster: 'monsterid',
    faces: 'wavatar',
    arcadeStyle: 'retro',
    robot: 'robohash',
    blankPNG: 'blank',
  },
};

export const getGravatarUrl = (email, { theme, size } = {}) => {
  return `${GRAVATAR.baseUrl}/avatar/${md5(email)}?d=${theme}&s=${size}`;
};
