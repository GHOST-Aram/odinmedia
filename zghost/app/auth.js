import passport from 'passport';
import FacebookStrategy from 'passport-facebook'
import { User } from '../db/User.js';
import { app } from './init.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import LocalStrategy from 'passport-local'
import {compareSync} from 'bcrypt'

app.use(session({ 
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URI,
		mongoOptions: {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		}
	}),
	cookie: {
		maxAge: 24 * 60 * 60 * 1000
	}
}))

passport.use(new FacebookStrategy(
	{
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: '/auth/facebook/callback',
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

passport.use(new LocalStrategy(async(username, password, done) => {
	try {
		const user = await User.findOne({ email: username })
		
		if(!user){ return done(null, false) }
		if(!user.password){ return done(null, false)}

		if(compareSync(password, user.password)){
			return done(null, user)
		} else{
			return done(null, false)
		}
	} catch (error) {
		return done(error, false)
	}
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) =>{
	process.nextTick(() =>{
		return done(null, user.id)
	})
})

passport.deserializeUser(
    async(id, done) =>{

    try {
		const user = await User.findById(id)
		return done (null, user)
	} catch (error) {
        return done (error, false)
    }       
})

export {app}


