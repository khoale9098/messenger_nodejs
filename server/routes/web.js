import express from 'express';
import { home, auth, user } from '../controllers/index';
import { authValid, userValid } from '../validation/index';
import initPassportLocal from './../controllers/passportController/local'
import initPassportFacebook from '../controllers/passportController/facebook'
import initPassportGoogle from '../controllers/passportController/google'
import passport from 'passport';
//
initPassportLocal();
initPassportFacebook();
initPassportGoogle();
//
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
    //facebook
    router.get('/auth/facebook', auth.checkLoggedOut, passport.authenticate("facebook", {
        scope: ["email"]
    }))
    router.get('auth/facebook/callback', auth.checkLoggedOut, passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/login-register",
    }))
    //google
    router.get('/auth/google', auth.checkLoggedOut, passport.authenticate("google", {
        scope: ["email"]
    }))
    router.get('auth/google/callback', auth.checkLoggedOut, passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login-register",
    }))
    //
    router.get("/logout", auth.checkLoggedIn, auth.getLogout)
    //user
    router.put('/user/update-avatar', auth.checkLoggedIn, userValid.updateInfo, user.updateAvatar);
    router.put('/user/update-info', auth.checkLoggedIn, userValid.updateInfo, user.updateInfo);
    //route
    return app.use('/', router)
}
module.exports = initRoutes;