import { app } from './zghost/app/config.js';
import { postsRouter } from "./server/content/posts.urls.js";
import { socialRouter } from './server/social/social.urls.js';
import { profilesRouter } from './server/profiles/profiles.urls.js';
import { authRouter } from './server/auth/auth.urls.js';
import { isLoggedIn } from './server/auth/auth.controllers.js';
import { 
	get_404_error_page, 
	get_500_error_page, 
	get_unauthenticated_500_page
} from './utils/errors.js';


app.use((req, res, next) => {
	if(req.isAuthenticated()){
		res.locals.user = req.user
	}
	next()
})

app.get('/', (req, res) => {
	res.redirect('/posts')
})

app.use('/auth', authRouter)
app.use('/posts',isLoggedIn, postsRouter)
app.use('/social', isLoggedIn, socialRouter)
app.use('/profiles',isLoggedIn, profilesRouter)

//Error handling
app.use(get_404_error_page);
app.use( get_500_error_page);
app.use(get_unauthenticated_500_page)

export {app};
