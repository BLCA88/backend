import mongoose from 'mongoose';
import { productosCollection } from './productos.model.js';

const carritoCollection = 'carrito'

const carritoSchema = new mongoose.Schema({
    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: productosCollection
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

export const carritoModel = mongoose.model(carritoCollection, carritoSchema);