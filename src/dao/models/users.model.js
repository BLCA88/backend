import mongoose from 'mongoose';


const usersCollection = 'usuarios'

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
});

export const usersModel = mongoose.model(usersCollection, usersSchema);