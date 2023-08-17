import 'dotenv/config';

const { AVATARS_DIR: dir } = process.env;

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

export const AVATAR_OPTIONS = {
  dir,
  width: 250,
  height: 250,
  gravaTheme: GRAVATAR.theme.robot,
};
