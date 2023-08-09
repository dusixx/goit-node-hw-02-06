import { HTTP_STATUS } from '../../constants/index.js';
import { Contact } from '../../models/index.js';

export const add = async ({ body }, res, next) => {
  const result = await Contact.create(body);
  res.status(HTTP_STATUS.created).json(result);
};
