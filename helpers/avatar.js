import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';
// (!!) надо чтобы в index.js avatar.js импортировался после зависимостей ниже
// Иначе будет ReferenceError: Cannot access '...' before initialization
import { HttpError, bitmap, checkFileExists, getGravatarUrl } from './index.js';
import { HTTP_STATUS } from '../constants/index.js';

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
