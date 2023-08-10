import { HTTP_STATUS } from '../constants/index.js';
import { format } from '../helpers/index.js';
import { db } from '../helpers/index.js';

const ERR_CODE_DUPLICATE_KEY = 11000;

export const handlePostSaveError = function (err, doc, next) {
  switch (err.name) {
    case 'ValidationError':
      const { reason } = db.parseValidationErrorMessage(err.message);
      err.message = reason;
      err.status = HTTP_STATUS.badRequest;
      break;

    case 'MongoServerError':
      if (err.code === ERR_CODE_DUPLICATE_KEY) {
        const { key } = db.parseDupKeyErrorMessage(err.message);
        err.message = `"${key}" already exists`;
        err.status = HTTP_STATUS.conflict;
      }
  }
  next();
};

export const handlePreUpdateValidate = function (next) {
  this.options.runValidators = true;
  next();
};

export const handlePreSaveFormatting = function (next) {
  const doc = this._doc;

  Object.entries(doc).forEach(([key, value]) => {
    const formatter = format[key];
    if (formatter) doc[key] = formatter(value);
  });
  next();
};
