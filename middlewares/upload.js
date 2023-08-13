import multer from 'multer';
import path from 'path';
import { HttpError, rndUUID } from '../helpers/index.js';
import { joiSchema as schema } from '../schemas/contacts/index.js';
import {
  HTTP_STATUS,
  REGEXP,
  JIMP_SUPPORTED_FORMATS,
} from '../constants/index.js';

const destination = path.resolve('tmp');
const MAX_FILE_SIZE = 1024 ** 2;
const SUPPORTED_FORMATS = JIMP_SUPPORTED_FORMATS.join(', ');
const isImageType = mimeType => REGEXP.imageMimeType.test(mimeType);

//
// multer options
//

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    // добавим расширение к информации о файле
    file.extname = path.extname(file.originalname);
    cb(null, `${rndUUID()}${file.extname}`);
  },
});

const limits = {
  fileSize: MAX_FILE_SIZE,
};

const fileFilter = async (req, file, cb) => {
  const { fieldname, mimetype } = file;

  if (!isImageType(mimetype)) {
    return cb(
      HttpError(
        HTTP_STATUS.unprocContent,
        `${fieldname}: supported formats: ${SUPPORTED_FORMATS}`
      )
    );
  }
  cb(null, true);
};

const uploadImage = multer({
  storage,
  limits,
  fileFilter,
});

export const uploadSingleImage = fieldName => {
  return (req, res, next) => {
    const handler = uploadImage.single(fieldName);
    const message = `${fieldName}: file size limit: ${MAX_FILE_SIZE}`;

    // вызываем handler с кастомной обработкой ошибок
    handler(req, res, err => {
      if (err?.name === 'MulterError' && err.code === 'LIMIT_FILE_SIZE') {
        return next(HttpError(HTTP_STATUS.contentTooLarge, message));
      }
      next(err);
    });
  };
};
