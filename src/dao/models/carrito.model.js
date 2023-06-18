import mongoose from 'mongoose';

const carritoCollection = 'carrito'

const carritoSchema = new mongoose.Schema({
    productos: {
        type: Array,
        default: []
    }
});

const carritoModel = mongoose.model(carritoCollection, carritoSchema);
export default carritoModel;
