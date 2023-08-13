import { isFunc } from '../helpers/index.js';

export const cleanup = action => {
  return async (err, req, res, next) => {
    isFunc(action) && (await action(req));
    next(err);
  };
};
