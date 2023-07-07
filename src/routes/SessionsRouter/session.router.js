import { Router } from 'express';
import { usersModel } from '../../dao/index.managers.js';
import { VALIDATOR_JOI } from '../../utils/joi.utils.js';

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            const admin = {

                email: 'adminCoder@coder.com',
                password: 'adminCod3r123',
                name: 'Alan',
                last_name: 'Tutore',
                age: 999,
                role: 'admin'

            }

            admin[password] = undefined;
            req.session.user = admin;
        } else {
            const user = await usersModel.findOne({ email, password });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            };
            user[password] = undefined;
            req.session.user = user;
        }
        return res.status(200).redirect('/products');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.post('/register', async (req, res) => {
    const { email, password, name, last_name, age, role } = req.body;
    try {
        const nwUser = await VALIDATOR_JOI.user.validateAsync({
            email,
            password,
            name,
            last_name,
            age,
            role,
        });
        const user = await usersModel.create(nwUser);
        res.status(200).redirect('/login');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export { router as sessionRouter };