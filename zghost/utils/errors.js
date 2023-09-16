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
		res.status(500).json({
		  error: {
			status: 500,
			message: err.message
		  }
	  });
	}
}
