import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { validateId, verifyToken } from '../../middlewares/index.js';
import { joiSchema as schema } from '../../schemas/contacts/index.js';
import { ctrl } from '../../controllers/contacts/index.js';

export const router = express.Router();

// доступ только для авторизированных пользователей
router.use(verifyToken);

// GET
// получение списка всех контактов
router.get('/', ctrl.getAll);

// GET id
// получение контакта с заднным id
router.get('/:id', validateId, ctrl.getById);

// POST
// добавление нового контакта
router.post('/', validateBody(schema.add), ctrl.add);

// PUT id
// изменение контакта с заданным id
router.put('/:id', validateId, validateBody(schema.add), ctrl.updateById);

// PATCH id/favorite
// изменение поля favorite
router.patch(
  '/:id/favorite',
  validateId,
  validateBody(schema.updateStatus),
  ctrl.updateStatusById
);

// DELETE id
// удаление контакта с заданным id
router.delete('/:id', validateId, ctrl.removeById);
