import passport from 'passport';
import { User } from '../db/User.js';
import { app } from './init.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import * as strategies from '../utils/auth-strategies.js';


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

passport.use(strategies.facebookStrategy)
passport.use(strategies.localStrategy)

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


