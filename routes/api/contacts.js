import express from 'express';
import * as contactsSchemas from '../../schemas/index.js';
import { contactsController } from '../../controllers/index.js';
import { validateBody } from '../../decorators/index.js';
import { isValidId } from '../../middlewares/index.js';

export const router = express.Router();

// GET
// получение списка всех контактов
router.get('/', contactsController.listContacts);

// POST
// добавление нового контакта
router.post('/', contactsController.addContact);

// GET id
// получение контакта с заднным id
router.get('/:id', isValidId, contactsController.getContactById);

// PUT id
// изменение контакта с заданным id
router.put(
  '/:id',
  isValidId,
  validateBody(contactsSchemas.contactAddSchema),
  contactsController.updateContactById
);

// PATCH id/favorite
// изменение поля favorite
router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateContactFavoriteById
);

// DELETE id
// удаление контакта с заданным id
router.delete('/:id', isValidId, contactsController.removeContactById);
