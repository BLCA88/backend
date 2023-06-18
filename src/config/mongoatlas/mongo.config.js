import { mongoose } from "mongoose";
const uri = "mongodb+srv://jlantunez88:5cFydqHaNeCD49B1@ecommerce.6y6wds7.mongodb.net/?retryWrites=true&w=majority";

export const connectionMongo = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.log("🚀 ~ file: mongoConnect.js:9 ~ connectionMongo ~ error:", error)
    }
};

// Manejo de eventos de conexión
mongoose.connection.on('connected', () => {
    console.log('');
    console.log('🚀 [Conexión exitosa a MongoDB Atlas] 🚀');
});

// Manejo de eventos de error
mongoose.connection.on('error', (error) => {
    console.log('');
    console.error('[Error de conexión a MongoDB Atlas:]', error);
});

// Manejo de eventos de desconexión
mongoose.connection.on('disconnected', () => {
    console.log('');
    console.log('{Se perdio la conexion con MongoDB Atlas]');
});

// Cerrar la conexión cuando el proceso de Node.js se cierra
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed due to application termination');
        process.exit();
    });
});