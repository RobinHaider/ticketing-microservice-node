import mongoose from 'mongoose';

export const generateMongoosId = () => {
  return new mongoose.Types.ObjectId().toHexString();
};
