import passport from 'passport';
import { User } from '../db/User.js';
import { app } from './init.js';
import * as strategies from '../utils/auth-strategies.js';
import { authentication_session } from '../utils/session.js';

app.use(authentication_session())

passport.use(strategies.facebookStrategy)
passport.use(strategies.localStrategy)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) =>{
	process.nextTick(() =>{
		return done(null, user.id)
	})
})

passport.deserializeUser( async(id, done) =>{
    try {
		const user = await User.findById(id)
		return done (null, user)
	} catch (error) {
        return done (error, false)
    }       
})

export {app}


