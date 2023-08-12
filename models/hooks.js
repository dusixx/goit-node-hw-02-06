import { HTTP_STATUS } from '../constants/index.js';
import { format, db } from '../helpers/index.js';

const ERR_CODE_DUPLICATE_KEY = 11000;

const handlePostSaveError = function (err, doc, next) {
  switch (err.name) {
    case 'ValidationError':
      const { reason } = db.parseValidationErrorMessage(err.message);
      err.message = reason;
      err.status = HTTP_STATUS.badRequest;
      break;

    case 'MongoServerError':
      if (err.code === ERR_CODE_DUPLICATE_KEY) {
        const { key } = db.parseDupKeyErrorMessage(err.message);
        err.message = `index: dup key: "${key}"`;
        err.status = HTTP_STATUS.conflict;
      }
  }
  next();
};

const handlePreUpdateValidate = function (next) {
  // console.log('-- Inside handlePreUpdateValidate --');
  this.options.runValidators = true;
  next();
};

const handlePreSaveFormatting = function (next) {
  const doc = this._doc;

  // если для поля с именем [key] есть форматтер - форматируем его
  Object.entries(doc).forEach(([key, value]) => {
    const formatter = format[key];
    if (formatter) doc[key] = formatter(value);
  });
  next();
};

export const hook = {
  handlePostSaveError,
  handlePreUpdateValidate,
  handlePreSaveFormatting,
};
