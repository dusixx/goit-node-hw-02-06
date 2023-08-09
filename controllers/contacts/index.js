import { ctrlWrapper } from '../../decorators/index.js';
import { add } from './add.js';
import { getAll } from './getAll.js';
import { getById } from './getById.js';
import { removeById } from './removeById.js';
import { updateById } from './updateById.js';
import { updateStatusById } from './updateStatusById.js';

export const ctrl = {
  add: ctrlWrapper(add),
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatusById: ctrlWrapper(updateStatusById),
};
