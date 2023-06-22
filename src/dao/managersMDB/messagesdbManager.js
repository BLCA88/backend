import messageModel from "../models/messages.model.js";

export default class MessageManager {
    async createMessage(objeto) {
        try {
            const messagesdb = new messageModel(objeto);
            await messagesdb.save();
            return ({
                message: 'Mensajes subidos al servidor',
                state: messagesdb.messages
            })
        } catch (error) {
            console.log(error);
        }

    }
}

export const messagedbManager = new MessageManager();