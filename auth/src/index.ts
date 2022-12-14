import mongoose from 'mongoose';
import { app } from './app';

// mongo db connect
// mongodo://serviceName:port/databasename
// if database not exist, it will create
const start = async () => {
  // jwt env check
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  // MongoURI env check
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
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
