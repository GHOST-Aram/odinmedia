import { body, validationResult } from "express-validator";

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
            .isEmpty()
            .withMessage(
                `${ identifier } field cannot be empty.`
            )
            .escape()
    }

    validateUrl = (field, { identifier }) => {
        return body(field)
            .trim()
            .optional()
    }
}

export const getValidationResult =(req) => validationResult(req) 
export const validator = new Validitor()