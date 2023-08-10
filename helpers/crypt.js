import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const DEF_HASH_SALT = 10;
const { JWT_SECRET } = process.env;

export const token = {
  make(id, expiresIn = '23h') {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn });
  },
  verify() {
    try {
      const { id } = jwt.verify(token, (key = JWT_SECRET));
      return id;
    } catch {
      return null;
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
  async hash(s, salt = DEF_HASH_SALT) {
    try {
      return await bcrypt.hash(s, salt);
    } catch {
      return null;
    }
  },
};
