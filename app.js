import { app } from './zghost/app/config.js';
import { postsRouter } from "./src/content/posts.urls.js";
import { socialRouter } from './src/social/social.urls.js';
import { profilesRouter } from './src/profiles/profiles.urls.js';
import { authRouter } from './src/auth/auth.urls.js';
import { isLoggedIn } from './src/auth/auth.controllers.js';
import { 
	get_404_error_page, 
	get_500_error_page, 
	get_unauthenticated_500_page
} from './utils/errors.js';


app.use((req, res, next) => {
  res.locals.user = req.user
  next()
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
