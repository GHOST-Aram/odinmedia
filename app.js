import { app } from './zghost/app/config.js';
import { postsRouter } from "./routes/posts.js";
import createHttpError from 'http-errors';
import { peopleRouter } from './routes/people.js';
import { friendsRouter } from './routes/friends.js';
import { profilesRouter } from './routes/profiles.js';
import { authRouter } from './routes/auth.js';
import { isLoggedIn } from './controllers/auth.js';



app.get('/', (req, res) => {
	res.redirect('/posts')
})
app.use('/auth', authRouter)
app.use('/posts',isLoggedIn, postsRouter)
app.use('/people',isLoggedIn, peopleRouter)
app.use('/friends',isLoggedIn, friendsRouter)
app.use('/profiles',isLoggedIn, profilesRouter)

//Error handling
app.use(function(req, res, next) {
    next(createHttpError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('errors/error');
  });

export {app};
