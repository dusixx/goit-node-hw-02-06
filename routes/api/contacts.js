import express from 'express';
import * as contactsSchemas from '../../schemas/index.js';
import { ctrl } from '../../controllers/contacts/index.js';
import { validateBody } from '../../decorators/index.js';
import { isValidId } from '../../middlewares/index.js';

export const router = express.Router();

// GET
// получение списка всех контактов
router.get('/', ctrl.getAll);

// GET id
// получение контакта с заднным id
router.get('/:id', isValidId, ctrl.getById);

// POST
// добавление нового контакта
router.post('/', validateBody(contactsSchemas.contactAddSchema), ctrl.add);

// PUT id
// изменение контакта с заданным id
router.put(
  '/:id',
  isValidId,
  validateBody(contactsSchemas.contactAddSchema),
  ctrl.updateById
);

// PATCH id/favorite
// изменение поля favorite
router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  ctrl.updateStatusById
);

// DELETE id
// удаление контакта с заданным id
router.delete('/:id', isValidId, ctrl.removeById);
