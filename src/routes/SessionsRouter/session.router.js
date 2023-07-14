import { Router } from 'express';
import passport from 'passport';
import { usersModel } from '../../dao/index.managers.js';
import { userManager } from '../../dao/index.managers.js';
import { VALIDATOR_JOI } from '../../utils/joi.utils.js';

const router = Router();

router.post('/login', passport.authenticate('login', { failureRedirect: '/falla' }), async (req, res) => {
    console.log(req.user);
    req.session.user = {
        email: req.user.email,
        name: req.user.name,
        last_name: req.user.last_name,
        age: req.user.age,
        role: req.user.role
    }
    res.status(200).redirect('/products');

});

router.post('/register', passport.authenticate('register', { successRedirect: '/login', failureRedirect: 'register' }), async (req, res) => {
});


export { router as sessionRouter };