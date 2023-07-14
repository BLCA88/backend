import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { userManager } from '../../dao/managersMDB/userManager.js';
import { hashPassword, comparePassword } from '../../utils.js';
import { VALIDATOR_JOI } from '../../utils/joi.utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
            async (req, username, password, done) => {
                const { email, name, last_name, age, role } = req.body;
                try {
                    const verifyEmail = await userManager.findOneByEmail(username)

                    if (verifyEmail) {
                        console.log('User already registered')
                        return done(null, false);
                    }
                    const validateUser = await VALIDATOR_JOI.user.validateAsync({
                        email,
                        password: hashPassword(password),
                        name,
                        last_name,
                        age,
                        role,
                    });
                    const newUser = await userManager.registerUser(validateUser);
                    return done(null, newUser);
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );

    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'email',
        },
            async (username, password, done) => {
                try {
                    const user = await userManager.findOneByEmail(username);
                    if (!user) {
                        console.log('User not found')
                        return done(null, false);
                    };
                    if (!comparePassword(user, password)) {
                        console.log('invalid password')
                        return done(null, false);
                    };
                    return done(null, user);
                } catch (error) {
                    console.log('catch')
                    return done(error, false);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userManager.findById(id);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    });
}

export default initializePassport;
