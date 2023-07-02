import joi from 'joi';

const product = joi.object({
    titulo: joi.string().min(7).max(50).required(),
    descripcion: joi.string().min(3).max(80).required(),
    code: joi.string().min(3).max(15).required(),
    precio: joi.number().required(),
    stock: joi.number().min(1).default(1).required(),
    status: joi.boolean().default(true),
    category: joi.string().min(3).max(20).required(),
    imagen: joi.array(),
});

export const JOI_VALIDATOR = { product } 