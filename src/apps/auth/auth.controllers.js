import { Authenticator } from "../../zghost/app/init.js"
import { getValidationResult } from "../../zghost/utils/validator.js"

export class AuthController{
    #dataAccessLayer
    constructor(dataAccessLayer){
        this.#dataAccessLayer = dataAccessLayer
    }
    creat_user = (req, res) =>{
        const errors = getValidationResult(req)
    
        if(!errors.isEmpty()){
            res.render('accounts/sign-up', 
                {errors: errors.array(), title: 'Sign Up Error'}
            )
        } else {
            const userDetails = { 
                first_name: req.body.first_name, 
                last_name: req.body.last_name, 
                email: req.body.email, 
                password: req.body.password
            }
            try {
                this.#dataAccessLayer.createUserWithHashedPassword(userDetails)
                res.redirect('/auth/login')
    
            } catch (error) {
                console.log(error)
                    res.status(500).send('Internal server error')
            } 
        }
    
    }
    
    get_login_form = (req, res) =>{
        res.render('accounts/login', {title: 'Login', errors: null})
    }
    
    get_sign_up_form = (req, res) =>{
        res.render('accounts/sign-up', { title: 'Sign Up', errors: null})
    }
    
    
    login = [
        (req, res, next) =>{
            const errors = getValidationResult(req)
    
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
            successRedirect: '/posts'
        })
    ]
    
    logout = (req, res, next) =>{
        req.logout(function(error) {
            if(error){ return next(error)}
        })
        res.redirect('/auth/login')
    }
}
export const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else{
        res.redirect('/auth/login')
    }
}