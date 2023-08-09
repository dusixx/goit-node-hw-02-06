import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDb } from './helpers/index.js';

dotenv.config();

const { SERVER_PORT } = process.env;

try {
  await connectMongoDb('db0');

  app.listen(SERVER_PORT, () => {
    console.log(
      `Server running on port ${SERVER_PORT}\nmode: ${app.get('env')}`
    );
  });
} catch ({ message }) {
  console.error(`\x1b[41mError:`, `${message}\x1b[0m`);
}
