import { body, validationResult } from "express-validator";
import { User } from "../db/User.js";

class Validitor{
    validateName = (field) => {
        return body(field)
            .trim()
            .notEmpty()
            .withMessage('Please ensure to fill all the required name fields.')
            .escape()
    }


    validateEmail = (field) =>{
        return body(field)
            .trim()
            .notEmpty()
            .withMessage('Please ensure to include your email.')
            .escape()
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom(async(email) =>{
                //Check if email has been reistered.
                const user = await User.findOne({ email })
                if(user){
                    throw new Error(
                        `The Email ${ email } has already been registered.`
                    )
                }
            })
            
    }

    validatePassword = (field) =>{
        return body(field)
            .trim()
            .notEmpty()
            .withMessage('Password field cannot be empty.')
            .isLength({ min: 8, max: 24 })
            .withMessage(
                'Please enter a password of length between 8 and 24.'
            )
            .isAlphanumeric()
            .withMessage('Please Enter an alphanumeric password.')
            .escape()
    }

    validatePlainText = (field, { identifier }) =>{
        return body(field)
            .trim()
            .notEmpty()
            .withMessage(
                `${ identifier } field cannot be empty.`
            )
            .escape()
    }
}

export { validationResult }
export const validator = new Validitor()