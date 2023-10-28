import { hash } from '../zghost/app/init.js'
import { User } from "../zghost/db/User.js"

export const createUserWithHashedPassword = (
    {first_name, last_name, email, password}
) =>{
    hash(password, 10, async(err, hashedPasscode) =>{
        if(err) throw err
        await User.create({
            first_name,
            last_name,
            email,
            password: hashedPasscode,
        } )
    }) 
}