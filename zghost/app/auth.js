import passport from 'passport';
import { app } from './init.js';
import * as strategies from '../utils/auth-strategies.js';
import { authentication_session } from '../utils/session.js';
import * as cookies from '../utils/cookies.js';

app.use(authentication_session())
passport.use(strategies.facebookStrategy)
passport.use(strategies.localStrategy)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(cookies.create_cookie)
passport.deserializeUser(cookies.decode_cookie)

export {app}


