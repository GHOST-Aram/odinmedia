import session from 'express-session';
import MongoStore from 'connect-mongo';

export const authentication_session = () => session({ 
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
})