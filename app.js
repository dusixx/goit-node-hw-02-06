import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { contactsRouter, authRouter } from './routes/api/index.js';
import { HTTP_STATUS } from './constants/index.js';
import { detailSrvErrMsg } from './helpers/index.js';

export const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// авто конвертация бинарных данных
// в заданный полем Content-type формат
app.use(express.json());
app.use(logger(formatsLogger));
app.use(cors());

app.use(/\/api\/(auth|users)/, authRouter);
app.use('/api/contacts', contactsRouter);

// неизвестный маршрут
app.use((req, res) => {
  res.status(404).json(detailSrvErrMsg(req, 'Not found'));
});

// общий обработчик ошибок
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json(detailSrvErrMsg(req, message));
});
