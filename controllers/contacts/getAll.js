import { Contact } from '../../models/index.js';

export const getAll = async (req, res) => {
  // можно указать параметры, например, .find({}, '-createdAt -updatedAt')
  const result = await Contact.find();
  res.json(result);
};
