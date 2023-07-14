import { usersModel } from "../models/users.model.js";

export default class UserManager {

    async registerUser(user) {
        const newUser = new usersModel(user);
        await newUser.save();
        return newUser;
    };

    async findOneByEmail(email) {
        const user = await usersModel.findOne({ email: email })
        return user;
    };

    async findById(id) {
        const user = await usersModel.findById(id);
        return user;
    }

};

export const userManager = new UserManager();