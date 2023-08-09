import { HttpError } from '../../helpers/index.js';
import { HTTP_STATUS } from '../../constants/index.js';
import { Contact } from '../../models/index.js';

export const getById = async ({ params }, res, next) => {
  const { id } = params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(HTTP_STATUS.notFound);
  }
  res.json(result);
};
