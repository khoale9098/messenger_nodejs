import passport from 'passport';
import passportGoogle from 'passport-google-oauth';
import UserModel from '../../models/Users'
import { transErrors, transSuccess } from '../../../lang/vi'
let GoogleStrategy = passportGoogle.OAuth2Strategy;


/**
 * Valid user account type: Google;
 */
let initPassportGoogle = () => {
    passport.use(new GoogleStrategy({
        clientID: "1070207930798-d326gmvtnp2gu2kk8n760drfe1vhp1b0.apps.googleusercontent.com",
        clientSecret: "BwAUXRaPwWg2f6Ywaszvp74t",
        callbackURL: "https://localhost:3000/auth/facebook/callback",
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findByGoogleUid(profile.id);
            //
            if (user) {
                return done(null, user, req.flash("success", transSuccess.loginSuccess(user.username)))
            }
            let neUserItem = {
                username: profile.displayName,
                gender: profile.gender,
                local: { idActive: true },
                google: {
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
module.exports = initPassportGoogle;
