import { app, Authenticator } from './init.js';
import * as strategies from '../utils/auth-strategies.js';
import { authentication_session } from '../utils/session.js';
import * as cookies from '../utils/cookies.js';

app.use(authentication_session())
Authenticator.use(strategies.facebookStrategy)
Authenticator.use(strategies.localStrategy)
app.use(Authenticator.initialize())
app.use(Authenticator.session())

Authenticator.serializeUser(cookies.create_cookie)
Authenticator.deserializeUser(cookies.decode_cookie)

export {app}


