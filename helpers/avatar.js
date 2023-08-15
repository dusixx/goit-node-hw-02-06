import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';
import { bitmap, getHash as md5 } from './index.js';
import { HttpError } from './index.js';
import { HTTP_STATUS } from '../constants/index.js';

const GRAVATAR = {
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

const getGravatarUrl = (
  email,
  { theme = GRAVATAR.theme.robot, size = 250 } = {}
) => {
  return `${GRAVATAR.baseUrl}/avatar/${md5(email)}?d=${theme}&s=${size}`;
};

const checkFileExists = async path => {
  try {
    (await fs.stat(path)).isFile();
  } catch {
    throw Error('File not found');
  }
};

export class Avatar {
  static getGravatarUrl = getGravatarUrl;

  #path;

  constructor(filePath) {
    return (async () => {
      await checkFileExists(filePath);
      await bitmap.checkFileFormat(filePath);
      this.#path = path.resolve(filePath);

      return this;
    })();
  }

  get path() {
    return this.#path;
  }

  get fileName() {
    return path.basename(this.#path);
  }

  async moveTo(dst) {
    const newPath = path.resolve(path.join(dst ?? '', this.fileName));
    await fs.rename(this.#path, newPath);
    this.#path = newPath;
  }

  async resize(options) {
    this.#path = await bitmap.resize(this.#path, options);
  }
}
