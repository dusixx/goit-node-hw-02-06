import { HttpError } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';
import { controllerWrapper } from '../decorators/index.js';
import { Contact as col } from '../models/contacts.js';

// const ERR_ALREADY_EXISTS =
//   'A contact with the same email or phone already exists';

const listContacts = async (req, res, next) => {
  const list = await col.find(/* {}, '-createdAt -updatedAt */);
  res.json(list);
};

const addContact = async ({ body }, res, next) => {
  const result = await col.create(body);
  res.status(HTTP_STATUS.created).json(result);
};

const getContactById = async ({ params }, res, next) => {
  const { id } = params;
  const result = await col.findById(id);
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await col.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};

const updateContactFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await col.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};

const removeContactById = async ({ params }, res, next) => {
  const { id } = params;
  const result = await col.findByIdAndDelete(id);
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};

//
// wrappers
//

export const contactsController = {
  listContacts: controllerWrapper(listContacts),
  addContact: controllerWrapper(addContact),
  getContactById: controllerWrapper(getContactById),
  updateContactById: controllerWrapper(updateContactById),
  updateContactFavoriteById: controllerWrapper(updateContactFavoriteById),
  removeContactById: controllerWrapper(removeContactById),
};
