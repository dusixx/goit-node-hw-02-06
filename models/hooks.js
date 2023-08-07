import { HTTP_STATUS } from '../constants/index.js';

export const handlePostSaveError = (err, data, next) => {
  err.status = HTTP_STATUS.badRequest;
  next();
};

export const handlePreUpdateValidate = function (next) {
  this.options.runValidators = true;
  next();
};
