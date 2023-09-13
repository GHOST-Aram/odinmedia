export const error500 = (err, req, res, next) =>{
    if(err){
		res.status(500).json({
		  error: {
			status: 500,
			message: err.message
		  }
	  });
	}
}

export const error404 = (req, res) =>{
	res.status(404).json( {
			error: {
			status: 404,
			message: 'Resource not found.' 
		}
	})
}