import mongoose from 'mongoose';
import { productsCollection } from './productos.model.js';

const carritoCollection = 'carrito'

const carritoSchema = new mongoose.Schema({
    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: productsCollection
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

export const carritoModel = mongoose.model(carritoCollection, carritoSchema);