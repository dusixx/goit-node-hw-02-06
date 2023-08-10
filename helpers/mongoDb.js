import mongoose from 'mongoose';
import dotenv from 'dotenv';

/**
 *
 * @param {string} dbName - имя БД
 * @param {string} varName - имя переменной окружения, содержащей uri
 * @returns {object}
 */
export const connectMongoDb = async (dbName, varName = 'DB_HOST') => {
  dotenv.config();

  const uri = process.env[varName].replace('<db_name>', dbName || '');
  if (process.env.NODE_ENV === 'development') console.log(uri);

  return await mongoose.connect(uri);
};

/**
 *
 * @param {Error|string} errOrMsg
 * @returns {string} последнюю часть (кастомную) сообщения об ошибке
 */
export const parseValidationErrorMessage = errOrMsg => {
  const message = errOrMsg?.message ?? errOrMsg ?? '';
  // premsg1: premsg2: reason[customMessage]
  const [, reason] = message.match(/^(?:[^:]+:){2}\s+(.+)$/);

  return { reason };
};

/**
 *
 * @param {Error|string} errOrMsg
 * @returns {string} имя поля, значение которого дублируется
 */
export const parseDupKeyErrorMessage = errOrMsg => {
  const message = errOrMsg?.message ?? errOrMsg ?? '';
  // для случая с индексом по отдельным полям (некомбинированного)
  const [, collection] = message.match(/^[^:]+:\s+([^\s]+)/);
  const [, key] = message.match(/{\s+(.+):.+\}$/);

  return {
    key,
    collection,
  };
};
