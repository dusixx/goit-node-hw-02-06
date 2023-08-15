import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';
import { isNum } from './index.js';
import { JIMP_SUPPORTED_EXTNAMES } from '../constants/index.js';

const resize = async (
  filePath,
  { width: w, height: h, jpeg: qual, cover, removeOriginal } = {}
) => {
  let img = await Jimp.read(filePath);

  let saveAsJpeg = qual >= 0 || qual <= 100;
  let newFilePath =
    saveAsJpeg && img._originalMime !== 'image/jpeg'
      ? filePath.replace(/(?<=\.)\w{3,4}$/, 'jpg')
      : filePath;

  // трансформируем битмап
  if (isNum(w) && isNum(h)) {
    cover ? img.cover(w, h) : img.resize(w, h);
  }
  saveAsJpeg && img.quality(qual);

  // сохраняем битмап в файл
  await img.writeAsync(newFilePath);

  // удаляем оригинал, если filePath и newFilePath не совпадают
  // Иначе, просто перезаписываем исходный файл
  if (removeOriginal && newFilePath !== filePath) {
    await fs.unlink(filePath);
  }

  return newFilePath;
};

const checkFileFormat = async filePath => {
  const extname = path.extname(filePath).toLowerCase().slice(1);
  if (!JIMP_SUPPORTED_EXTNAMES.includes(extname))
    throw TypeError('Unsupported format');
};

export const bitmap = {
  resize,
  checkFileFormat,
};
