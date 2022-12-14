import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUser, errorHandler } from '@robinhaider3/ticketing-common';
import { NotFoundError } from '@robinhaider3/ticketing-common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // make it secure true so that is only works on https
    // secure: true
    // secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// not found route
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

// add error handler middleware
app.use(errorHandler);

// export app
export { app };
