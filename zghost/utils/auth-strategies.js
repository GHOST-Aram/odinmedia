import { 
    LocalStrategy, 
    comparePasswords, 
    FacebookStrategy,
	GoogleStrategy,
	GithubStrategy 
} from '../app/init.js'
import { User } from '../db/User.js'
import 'dotenv/config.js'

export const oAuth = (name) =>{
	try {
		const Strategy = getStrategy(name.toLowerCase())
		const { clientID, clientSecret } = getClientCredentials(name)
		const envName = name.toUpperCase()

		return new Strategy(
			{
				clientID,
				clientSecret,
				callbackURL: `/auth/${name.toLowerCase()}/callback`,
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
		
		
	} catch (error) {
		console.log(error)
	}

}

const getStrategy = (name) =>{
	switch(name){
		case 'google':
			return GoogleStrategy
		case 'facebook':
			return FacebookStrategy
		case 'github':
			return GithubStrategy
		default:
			throw new Error('Strategy Unavailable')
	}
}

const getClientCredentials = (name) =>{
	switch(name){
		case 'facebook':
			return {
				clientID: process.env.FACEBOOK_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			}
		case 'google':
			return {
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			}
		case 'github':
			return {
				clientID: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
			}
		default:
			throw new Error('Unavailable client credentials')
	}
}

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