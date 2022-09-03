import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session'; 

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // make it secure true so that is only works on https
    // secure: true
  })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// not found route
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

// add error handler middleware
app.use(errorHandler);


// mongo db connect
// mongodo://serviceName:port/databasename
// if database not exist, it will create
const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log("Connected to MongoDB");
    
  } catch (error) {
    console.error(error);
  }

  // start express
  app.listen(3000, () => {
    console.log('Listening on port 3000..');
  });
};


// start app...
start();


