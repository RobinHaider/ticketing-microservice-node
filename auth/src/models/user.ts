import mongoose from 'mongoose';
import { Password } from '../services/password';

// properties required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// User Document after create
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// User Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchma = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        // normal javascript delete a property from obj
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// before save to mongo hash password
userSchma.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

// add build method to user
userSchma.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchma);

export { User };
