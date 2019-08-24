import express from 'express';
import { home, auth } from '../controllers/index';
import { authValid } from '../validation/index';
import initPassportLocal from './../controllers/passportController/local'
import passport from 'passport';
initPassportLocal()
let router = express.Router();
let initRoutes = (app) => {
    router.get('/', auth.checkLoggedIn, home.getHome);
    //
    router.get('/login-register', auth.checkLoggedOut, auth.getLoginRegister);
    router.post('/register', auth.checkLoggedOut, authValid.register, auth.postRegister)
    router.get('/verify/:token', auth.verifyAccount)
    router.post('/login', auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true

    }));
    //
    router.get("/logout", auth.checkLoggedIn, auth.getLogout)
    return app.use('/', router)
}
module.exports = initRoutes;