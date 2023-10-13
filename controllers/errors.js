export const get_404_error_page = (req, res, next) => {
	res.status(404).render('errors/error',{
		title: 'Page not found',
        message: 'Wait! Looks like you are Lost: Page not Found.'
	})
}

export const get_500_error_page = (err, req, res, next) => {
    res.status(err.status || 500);
	console.log(err)
    res.render('errors/error_auth_500', {
		title: 'Internal server error.',
		heading: 'Internal server error.'
	});
}

export const get_unauthenticated_500_page = (err, req, res, next) => {
    res.status(err.status || 500);
	console.log(err)
    res.render('errors/error', {
		title: 'Internal server error.',
		Message: 'Sorry! Something went wrong on our side. Try again.',
	});
}