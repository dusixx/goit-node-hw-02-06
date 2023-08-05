import * as db from '../models/contacts.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../helpers/helpers.js';
import { controllerWrapper } from '../decorators/controllerWrapper.js';

const ERR_ALREADY_EXISTS =
  'A contact with the same email or phone already exists';

const listContacts = async (req, res, next) => {
  const list = await db.listContacts();
  res.json(list);
};

const getContactById = async ({ params }, res, next) => {
  const { id } = params;
  const data = await db.getContactById(id);

  if (!data) throw HttpError(HTTP_STATUS.notFound);
  res.json(data);
};

const addContact = async ({ body }, res, next) => {
  // вернет null, если контакт с таким email|phone уже есть
  const data = await db.addContact(body);

  if (!data) throw HttpError(HTTP_STATUS.alreadyExists, ERR_ALREADY_EXISTS);
  res.status(HTTP_STATUS.created).json(data);
};

const removeContact = async ({ params }, res, next) => {
  const { id } = params;
  const data = await db.removeContact(id);

  if (!data) throw HttpError(HTTP_STATUS.notFound);
  res.json(data);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const body = req.validatedBody ?? req.body;
  const data = await db.updateContact(id, body);

  if (!data) throw HttpError(HTTP_STATUS.notFound);
  res.json(data);
};

// wrappers
export const contactsController = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
};
