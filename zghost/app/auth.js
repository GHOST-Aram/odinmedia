import passport from 'passport';
import FacebookStrategy from 'passport-facebook'
import { User } from '../db/User.js';
import session from 'express-session';

export class Authentication {

    constructor(app){
        this.app = app
    }
    authWithFacebook = () =>{
        passport.authenticate('facebook', { scope: 'email' })
    }
    initialize = () => passport.initialize()

    authenticateSession = () => passport.session()

    serializeUser = () => passport.serializeUser((user, done) =>{
        return done(null, user.id)
    })

    deserializeUser = () => passport.deserializeUser(async(id, done) =>{
        try {
            const user = await User.findById(id)
            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    })

    setUpSession = ({secret, mongoUrl, maxAge}) =>
        this.app.use(session({
            secret: secret,
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl: mongoUrl,
                mongoOptions: {
                    useUnifiedToplogy: true,
                    useNewUrlParser: true,
                }
            }),
            cookie: {
                maxAge: maxAge
            }
        }))
    

    useFacebookStrategy = (
        {clientID, clientSecret, callbackUrl}) =>
            passport.use(new FacebookStrategy({
                clientID: clientID,
                clientSecret: clientSecret,
                callbackUrl: callbackUrl,
                profileFields: [
                    'id',
                    'displayName',
                    'name',
                    'gender',
                    'picture.type(large)',
                    'email'
                ]
            },
            async(token, refreshToken, profile, done) => {
                try {
                    const user = await User.findOne({ profileId: profile.id })

                    if(user){return done(null, user)}
                    else{
                        const newUser = await User.create({
                            profileId: profile.id,
                            name: profile.displayName,
                            first_name: profile.name.givenName,
                            last_name: profile.name.familyName,
                            middle_name: profile.name.middle_name,
                            pictureUrl: profile._json.picture.data.url
                        })

                        return done(null, user)
                    }
                    
                } catch (error) {
                    return done(error, false)
                }
                
            }
        ))

}