import 'dotenv/config';
import jwtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const { JWT_SECRET, JWT_EXPIRES_IN, HASH_SALT } = process.env;

export const jwt = {
  create(id, expiresIn = JWT_EXPIRES_IN) {
    return jwtoken.sign({ id }, JWT_SECRET, { expiresIn });
  },
  verify(token, key = JWT_SECRET) {
    try {
      return jwtoken.verify(token, key);
    } catch {
      // false вместо null,
      // чтобы работало const { id } = verify(..)
      return false;
    }
  },
  decode(token) {
    return jwtoken.decode(token);
  },
};

export const hash = {
  async compare(s, hash) {
    try {
      return await bcrypt.compare(s, hash);
    } catch {
      return false;
    }
  },
  async create(s, salt = HASH_SALT) {
    try {
      // без конвертации в число выдает ошибку
      return await bcrypt.hash(s, Number(salt));
    } catch {
      return '';
    }
  },
};

export const uuid = splitter => {
  return crypto.randomUUID().replaceAll('-', splitter ?? '');
};

export const createHash = (
  str,
  { algorithm = 'md5', encoding = 'hex' } = {}
) => {
  return crypto.createHash(algorithm).update(str).digest(encoding);
};

export const rndStr = () => {
  return `${Date.now()}${Math.round(Math.random() * 1e9)}`;
};
