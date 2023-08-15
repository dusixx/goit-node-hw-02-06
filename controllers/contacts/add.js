import { HTTP_STATUS } from '../../constants/index.js';
import { HttpError } from '../../helpers/index.js';
import { Contact } from '../../models/index.js';

const ERR_ALREADY_EXISTS =
  'A contact with same phone or email is already in your list';

export const add = async (req, res) => {
  const {
    body: { email, phone },
    user: { _id: owner },
  } = req;

  // проверяем, есть ли в списке контактов текущего owner
  // контакт с таким же телефоном или емейлом
  const found = await Contact.findOne({
    $and: [{ owner }],
    $or: [{ email }, { phone }],
  });

  if (found) throw HttpError(HTTP_STATUS.conflict, ERR_ALREADY_EXISTS);

  // добавляем id хозяина списка (owner)
  const result = await Contact.create({ ...body, owner });
  res.status(HTTP_STATUS.created).json(result);
};
