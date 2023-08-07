import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const { SERVER_PORT, DB_HOST } = process.env;

(async () => {
  try {
    const res = await mongoose.connect(DB_HOST);

    // start server
    app.listen(SERVER_PORT, () => {
      console.log(
        `Server running on port ${SERVER_PORT}\nmode: ${app.get('env')}`
      );
    });
  } catch ({ message }) {
    console.error(`Error: ${message}`);
  }
})();
