import { hash } from "bcrypt"
import { User } from "../zghost/db/User.js"

export const createUserWithHashedPassword = (request) =>{
    const {first_name, last_name, email, password} = request.body
    hash(password, 10, async(err, hashedPasscode) =>{
        if(err) throw err
        await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPasscode,
        } )
    }) 
}