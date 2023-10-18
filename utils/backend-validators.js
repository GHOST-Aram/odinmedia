import { User } from "../zghost/db/User.js"
import { matchedData } from "../zghost/app/init.js"
import { validator } from "../zghost/utils/validator.js"

export const comment_validators = [
    validator.validatePlainText('comment', { identifier: 'Comment'}),
    validator.validateUrl('media_url', { identifier: 'Post Media Url' })
]

export const login_validators = [
    validator.validateEmail('username'),
    validator.validatePassword('password')
]

export const signup_validators = [
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
                throw new Error (
                    'Password and confirm password must be identical'
                )
            }
        }
    )
    ]

export const post_validators = [
    validator.validatePlainText(
        'post_content', {identifier: 'Post content'}
    ),
    validator.validateUrl('media_url', { identifier: 'Post Media Url'})
]

export const profile_info_validators = [

]