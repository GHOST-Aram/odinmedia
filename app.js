import { HttpError } from 'http-errors';
import { app } from './zghost/app/init.js';
import { config } from './zghost/app/config.js';
import passport from 'passport';
const createError = HttpError


//facebook strategy

config(app)

// view engine setup


app.get('/', function(req, res, next) {
	res.render('index', { title: 'Passport facebook auth' });
})

app.get('/auth/passport', 
passport.authenticate('facebook', { scope: 'email'})
)

const isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		next()
	} else{
		res.redirect('/auth/facebook')
	}
}
app.get('/friends', isLoggedIn, (res, req) =>{
	res.json({user: req.user})
})

app.get('/auth/facebook', 
	passport.authenticate('facebook'), (req, res) =>{
		res.json({user: req.user})
	}
)
app.get('/profile', (req, res) => {
	if(req.isAuthenticated()) 
		res.json({ message: "You are a valid user" })
	else
		res.json({ message: "Not authenticated"})

})

app.get('/failed', (req, res) =>{
	res.json({ message: "Unauthorised user" })
})
// catch 404 and forward to error 	
// app.use(function(req, res, next) {
//   next(HttpError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



export {app};
