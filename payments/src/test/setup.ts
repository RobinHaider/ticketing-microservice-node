import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

jest.mock('../nats-wrapper');

let mongo: any;

process.env.STRIPE_KEY = 'sk_test_hnfrAm8rOkryFEnV23jjfFlw';

beforeAll(async () => {
  // setup env variable
  process.env.JWT_KEY = '9vfuW4jchXa4Ysj3EGyYLKdRv5s03YO2we4fMGQOSC8=';

  // setup mongo
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
