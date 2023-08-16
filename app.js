import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { contactsRouter, authRouter } from './routes/api/index.js';
import { HTTP_STATUS, HTTP_STATUS_TEXT } from './constants/index.js';
import { detailErrorMessage } from './helpers/index.js';
import { mdw } from './middlewares/index.js';
import chalk from 'chalk';

export const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// авто конвертация бинарных данных
// в заданный полем Content-type формат
app.use(express.json());
app.use(logger(formatsLogger));
app.use(cors());

// (!!) неавторизированным не должно давать доступ к public
app.use(express.static('public'));

app.use(/\/api\/(auth|users)/, authRouter);
app.use('/api/contacts', contactsRouter);

// неизвестный маршрут
app.use((req, res) => {
  res.status(HTTP_STATUS.notFound).json(detailErrorMessage(req, 'Not found'));
});

// общий обработчик ошибок
app.use((err, req, res, next) => {
  let { status = HTTP_STATUS.serverError, message, stack } = err;

  // детали ошибок сервера на фронтенд не отправляем
  if (status === HTTP_STATUS.serverError) {
    console.log(chalk.blackBright(stack));
    message = 'Server error';
  }

  res.status(status).json(detailErrorMessage(req, message));
});
