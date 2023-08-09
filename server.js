import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDb } from './helpers/index.js';

dotenv.config();

const { SERVER_PORT } = process.env;
const DB_NAME = 'db-contacts';

console.log('\n\x1b[100mSrarting server...', '\x1b[0m');

try {
  await connectMongoDb(DB_NAME);
  console.log('Database connection successful');

  app.listen(SERVER_PORT, () => {
    console.log(
      `Server running on port ${SERVER_PORT}\nMode: ${app.get('env')}`
    );
  });
} catch ({ message }) {
  console.error(`\x1b[41mError:`, `${message}\x1b[0m`);
}
