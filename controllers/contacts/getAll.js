import { Contact } from '../../models/index.js';

const DEF_PAGE = 1;
const DEF_LIMIT = 20;

export const getAll = async ({ userId: owner, query }, res) => {
  const { page = DEF_PAGE, limit = DEF_LIMIT } = query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, ...query },
    '-createdAt -updatedAt',
    {
      skip,
      limit,
    }
  ).populate('owner', 'name email');

  res.json(result);
};
