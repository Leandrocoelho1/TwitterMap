import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import getRoutes from './routes';

const port = process.env.PORT || 8888;
const app = express();

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error);
  } else {
    console.log(error);
    res.status(500);
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === 'production'
        ? null
        : { stack: error.stack }),
    });
  }
}

app.use(express.json());
app.use(cors());
app.use('/', getRoutes());
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
