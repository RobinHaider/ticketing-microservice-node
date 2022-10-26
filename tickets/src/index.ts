import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

// mongo db connect
// mongodo://serviceName:port/databasename
// if database not exist, it will create
const start = async () => {
  // jwt env check
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  // Mongo URI env check
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    // nats connect
    await natsWrapper.connect('ticketing', 'abcd', 'http://nats-srv:4222');

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

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
