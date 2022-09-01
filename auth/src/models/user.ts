import mongoose from "mongoose";

// properties required to create a new user
interface UserAttrs {
    email: string;
    password: string;
}

const userSchma = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchma);

const buildUser = (attrs: UserAttrs) => {
    return new User(attrs);
}

export {User, buildUser};