import { Authenticator } from "../zghost/app/init.js"
import { createUserWithHashedPassword } from "../utils/auth.js"
import { validationResult, validator } from "../zghost/utils/validator.js"
import { User } from "../zghost/db/User.js"
import { matchedData } from "express-validator"


export const creat_user = [
    validator.validatePlainText('first_name', { identifier: 'First Name' }),
    validator.validatePlainText('last_name', { identifier: 'Last Name'}),
    validator.validateEmail('email').custom(
        async(email) =>{
            const user = await User.findOne({ email })
            
            if(user){
                throw new Error (`The email ${email} has been registered.`)
            }
        }
    ),
    validator.validatePassword('password'),
    validator.validatePassword('confirm_password').custom(
        async(confirm_password, { req }) =>{
            const { password } = matchedData(req)

            if(confirm_password !== password ){
                throw new Error ('Password and confirm password must be identical')
            }
        }
    ),

    (req, res) => {
        const errors = validationResult(req)
        console.log(errors.array())
        if(!errors.isEmpty()){
            res.render('accounts/sign-up', 
                {errors: errors.array(), title: 'Sign Up Error'}
            )
        } else {
            try {
                createUserWithHashedPassword(req)
                res.redirect('/auth/login')
    
            } catch (error) {
                console.log(error)
                    res.status(500).send('Internal server error')
            } 
        }

    }
]
export const get_login_form = (req, res) =>{
    res.render('accounts/login', {title: 'Login', errors: null})
}

export const get_sign_up_form = (req, res) =>{
    res.render('accounts/sign-up', { title: 'Sign Up', errors: null})
}

export const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else{
        res.redirect('/auth/login')
    }
}

export const login = [
    validator.validateEmail('username'),
    validator.validatePassword('password'),

    (req, res, next) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.render('accounts/login', 
                {errors : errors.array(), title: 'Login Error'}
            )
        } else {
            next()
        }
    },
    Authenticator.authenticate('local', {
        failureRedirect: '/auth/login',
        successRedirect: '/'
    })
]

export const logout = (req, res, next) =>{
    req.logout(function(error) {
        if(error){ return next(error)}
    })
    res.redirect('/auth/login')
}