import passport from 'passport';
import passportFacebook from 'passport-facebook';
import UserModel from '../../models/Users'
import { transErrors, transSuccess } from '../../../lang/vi'
let FacebookStrategy = passportFacebook.Strategy;

/**
 * Valid user account type: facebook;
 */
let initPassportFacebook = () => {
    passport.use(new FacebookStrategy({
        clientID: 484496559005392,
        clientSecret: "69d26bbea4156766cdaee85f68f853a1",
        callbackURL: "https://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email'],
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findByFacebookUid(profile.id);
            //
            if (user) {
                return done(null, user, req.flash("success", transSuccess.loginSuccess(user.username)))
            }
            let neUserItem = {
                username: profile.displayName,
                gender: profile.gender,
                local: { idActive: true },
                facebook: {
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value 
                }
            }
            let newUser = await UserModel.createNew(neUserItem);
            return done(null, user, req.flash("success", transSuccess.loginSuccess(newUser.username)))
        } catch (error) {
            console.log(error);
            return done(null, false, req.flash("errors", transErrors.server_error))
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
            .then(user => {
                return done(null, user)
            })
            .catch(err => {
                return done(error, null)
            })
    })
};
module.exports = initPassportFacebook;
