import { 
    LocalStrategy, 
    comparePasswords, 
    FacebookStrategy,
	GoogleStrategy,
	GithubStrategy 
} from '../app/init.js'
import { User } from '../db/User.js'
import 'dotenv/config.js'

export const githubStrategy = new GithubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: '/auth/github/callback',
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
)

export const googleStrategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback',
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
)

export const facebookStrategy = new FacebookStrategy(
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
)

export const localStrategy = new LocalStrategy(async(username, password, done) => {
	try {
		const user = await User.findOne({ email: username })
		
		if(!user){ return done(null, false) }
		if(!user.password){ return done(null, false)}

		if(comparePasswords(password, user.password)){
			return done(null, user)
		} else{
			return done(null, false)
		}
	} catch (error) {
		return done(error, false)
	}
})