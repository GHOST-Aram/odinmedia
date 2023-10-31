export const get_404_error_page = (req, res, next) => {
	res.status(404).render('errors/error',{
		title: 'Page not found',
        message: 'Wait! Looks like you are Lost: Page not Found.'
	})
}

export const get_500_error_page = (err, req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        
        res.status(err.status || 500);
        console.log(err)
        res.render('errors/error_auth_500', {
            title: 'Internal server error.',
            heading: 'Internal server error.'
        });

    } else {
        next()
    }
}

export const get_unauthenticated_500_page = (err, req, res, next) => {
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};
   
    res.status(res, err.status || 500);
    res.render('errors/error', {title: `Error | ${err.message}`});
}