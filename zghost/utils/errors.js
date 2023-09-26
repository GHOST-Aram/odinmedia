export const notFoundError = (req, res) =>{
	res.status(404).json( {
			error: {
			status: 404,
			message: 'Resource not found.' 
		}
	})
}
export const internalServerError = (err, req, res, next) =>{
    if(err){
		res.status(500).render('errors/500', {error: err})
	}
}
