import { HTTP_STATUS } from '../../constants/index.js';
import { Contact } from '../../models/index.js';

export const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(HTTP_STATUS.created).json(result);
};
