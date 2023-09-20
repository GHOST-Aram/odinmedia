import passport from 'passport';
import FacebookStrategy from 'passport-facebook'
import { User } from '../db/User.js';
import { app } from './init.js';

export const useFacebookStrategy = () => passport.use(new FacebookStrategy(
	{
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: `http://localhost:${process.env.PORT}/auth/facebook/callback`,
		profileFields: [
			'id', 
			'displayName', 
			'name', 
			'gender',
			'picture.type(large)',
			'email'
		]
	},
	async (token, refreshToken, profile, done) => {
		try {
			const user = await User.findOne({profileId: profile.id})
			if(user){
				return done(null, user)
			}
			else{
				const newUser = await User.create({
					profileId: profile.id,
					name: profile.displayName,
					first_name: profile.name.givenName,
					last_name: profile.name.familyName,
					middle_name: profile.name.middleName,
					pictureUrl: profile._json.picture.data.url
				})

				return done(null, newUser)
			}
		} catch (error) {
			return done(error, false)
		}
	}
))


export const initialize = () => app.use(passport.initialize())
export const authenticateSession = () => app.use(passport.session())

export const serializeUser = () => passport.serializeUser((user, done) =>{
	process.nextTick(() =>{
		return done(null, user.id)
	})
})

export const deserializeUser = () => passport.deserializeUser(
    async(id, done) =>{

    try {
		const user = await User.findById(id)
		return done (null, user)
	} catch (error) {
        return done (error, false)
    }       
})

export const authenticate = (strategy) => passport.authenticate(
	strategy)

export const isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		next()
	} else{
		res.redirect('/login')
	}
}
