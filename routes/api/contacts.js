import express from 'express';
import * as contactsSchemas from '../../schemas/contactsSchemas.js';
import { contactsController } from '../../controllers/contactsController.js';
import { validateBody } from '../../decorators/validateBody.js';

export const router = express.Router();

// GET: получение списка всех контактов
router.get('/', contactsController.listContacts);

// GET id: получение контакта с заднным id
router.get('/:id', contactsController.getContactById);

// POST: добавление нового контакта
router.post(
  '/',
  validateBody(contactsSchemas.addedContactScheme),
  contactsController.addContact
);

// DELETE id: удаление контакта с заданным id
router.delete('/:id', contactsController.removeContact);

// PUT id: изменение контакта с заданным id
router.put(
  '/:id',
  validateBody(contactsSchemas.updatedContactScheme),
  contactsController.updateContact
);
