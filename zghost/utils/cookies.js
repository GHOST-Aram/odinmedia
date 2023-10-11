import { User } from '../db/User.js';

export const create_cookie = (user, done) =>{
	process.nextTick(() =>{
		return done(null, user.id)
	})
}

export const decode_cookie = async(id, done) =>{
    try {
		const user = await User.findById(id)
		return done (null, user)
	} catch (error) {
        return done (error, false)
    }       
}