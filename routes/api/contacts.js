import express from 'express';
import * as contactsSchemas from '../../schemas/index.js';
import { contactsController } from '../../controllers/index.js';
import { validateBody } from '../../decorators/index.js';

export const router = express.Router();

// GET: получение списка всех контактов
router.get('/', contactsController.listContacts);

// GET id: получение контакта с заднным id
router.get('/:id', contactsController.getContactById);

// DELETE id: удаление контакта с заданным id
router.delete('/:id', contactsController.removeContact);

// POST: добавление нового контакта
router.post(
  '/',
  validateBody(contactsSchemas.addedContactScheme),
  contactsController.addContact
);

// PUT id: изменение контакта с заданным id
router.put(
  '/:id',
  validateBody(contactsSchemas.updatedContactScheme),
  contactsController.updateContact
);
