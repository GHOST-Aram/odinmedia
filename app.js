import { app } from './zghost/app/config.js';
import { postsRouter } from "./routes/posts.js";
import createHttpError from 'http-errors';
import { peopleRouter } from './routes/people.js';
import { friendsRouter } from './routes/friends.js';
import { profilesRouter } from './routes/profiles.js';
import { authRouter } from './routes/auth.js';
import { isLoggedIn } from './controllers/auth.js';
import { 
	get_404_error_page, 
	get_500_error_page, 
	get_unauthenticated_500_page
} from './controllers/errors.js';


app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})
app.get('/', (req, res) => {
	res.redirect('/posts')
})
app.use('/auth', authRouter)
app.use('/posts',isLoggedIn, postsRouter)
app.use('/people',isLoggedIn, peopleRouter)
app.use('/friends',isLoggedIn, friendsRouter)
app.use('/profiles',isLoggedIn, profilesRouter)

//Error handling
app.use(get_404_error_page);
app.use( isLoggedIn, get_500_error_page);
app.use(get_unauthenticated_500_page)

export {app};
