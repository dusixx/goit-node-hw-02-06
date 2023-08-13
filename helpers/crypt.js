import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import crypto from 'crypto';

const { JWT_SECRET, JWT_EXPIRES_IN, HASH_SALT } = process.env;

export const token = {
  create(id, expiresIn = JWT_EXPIRES_IN) {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn });
  },
  verify(token, key = JWT_SECRET) {
    try {
      return jwt.verify(token, key);
    } catch {
      // false вместо null,
      // чтобы работало const { id } = verify(..)
      return false;
    }
  },
  decode(token) {
    return jwt.decode(token);
  },
};

export const crypt = {
  async compare(s, hash) {
    try {
      return await bcrypt.compare(s, hash);
    } catch {
      return false;
    }
  },
  async hash(s, salt = HASH_SALT) {
    try {
      // без конвертации в число выдает ошибку
      return await bcrypt.hash(s, Number(salt));
    } catch {
      return '';
    }
  },
};

export const rndUUID = () => {
  return crypto.randomUUID().replaceAll('-', '');
};
