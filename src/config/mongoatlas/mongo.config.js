//<----------------<Conexion Mongo Atlas>---------------->
import { mongoose } from "mongoose";
import 'dotenv/config';
export const connectionMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_USER, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.log("🚀 ~ file: mongoConnect.js:9 ~ connectionMongo ~ error:", error)
    }
};


//<------------< Eventos de comunicación >--------------->
mongoose.connection.on('connected', () => {
    console.log('');
    console.log('🚀 [Conexión exitosa a MongoDB Atlas] 🚀');
});
mongoose.connection.on('error', (error) => {
    console.log('');
    console.error('[Error de conexión a MongoDB Atlas:]', error);
});
mongoose.connection.on('disconnected', () => {
    console.log('');
    console.log('[Se perdio la conexion con MongoDB Atlas]');
});
process.on('SIGINT', () => {
    mongoose.connection.close();
    console.log('');
    console.log('[Se cerro la conexion con MongoDB Atlas]');
    process.exit();
});