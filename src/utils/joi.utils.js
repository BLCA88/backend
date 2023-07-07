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

const user = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ar'] } }).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    name: joi.string().min(3).max(15),
    last_name: joi.string().min(3).max(30),
    age: joi.number().min(1).max(100),
    role: joi.string()
});

export const VALIDATOR_JOI = { product, user } 