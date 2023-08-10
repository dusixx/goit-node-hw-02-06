import mongoose from 'mongoose';
import 'dotenv/config';

/**
 *
 * @param {string} dbName - имя БД
 * @param {string} varName - имя переменной окружения, содержащей uri
 * @returns {object}
 */
const connect = async (dbName, varName = 'DB_HOST') => {
  const uri = process.env[varName].replace('<db_name>', dbName || '');
  if (process.env.NODE_ENV === 'development') console.log(uri);

  return await mongoose.connect(uri);
};

/**
 *
 * @param {Error|string} errOrMsg
 * @returns {string} последнюю часть (кастомную) сообщения об ошибке
 */
const parseValidationErrorMessage = errOrMsg => {
  const message = errOrMsg?.message ?? errOrMsg ?? '';
  // premsg1: premsg2: reason[customMessage]
  const [, reason] = message.match(/^(?:[^:]+:){2}\s+(.+)$/);

  return { reason };
};

/**
 *
 * @param {Error|string} errOrMsg
 * @returns {object} {collection, key}
 *    key - имя поля, значение которого дублируется,
 *    collection - имя целевой коллекции
 */
const parseDupKeyErrorMessage = errOrMsg => {
  const message = errOrMsg?.message ?? errOrMsg ?? '';
  // для случая с индексом по отдельным полям (некомбинированного)
  // имя коллекции может содержать пробелы и тп
  const [, collection] = message.match(/^.+:\s+(.+)\s+index/);
  const [, key] = message.match(/{\s+(.+):.+\}$/);

  return {
    key,
    collection,
  };
};

export const db = {
  connect,
  parseDupKeyErrorMessage,
  parseValidationErrorMessage,
};
