import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const productosCollection = 'productos'

const productoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    code: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true
    },
    imagen: {
        type: Array,
        default: []
    },
});


productoSchema.plugin(mongoosePaginate);

export const productoModel = mongoose.model(productosCollection, productoSchema);



