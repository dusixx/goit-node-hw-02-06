import app from './app.js';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { connectMongoDb } from './helpers/index.js';

dotenv.config();

const { SERVER_PORT } = process.env;
const DB_NAME = 'db-contacts';

console.log(chalk.bgGrey('\nConnecting db...'));

try {
  await connectMongoDb(DB_NAME);
  console.log('Database connection successful');

  console.log(chalk.bgGrey('Srarting server...'));

  app.listen(SERVER_PORT, () => {
    console.log(
      `Server running on port ${SERVER_PORT}\nMode: ${app.get('env')}`
    );
  });
} catch ({ message }) {
  console.error(chalk.red(`Error: ${message}\n`));
}
