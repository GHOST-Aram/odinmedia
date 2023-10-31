const emailField = document.querySelector('input[type=email]')
const passwordField = document.querySelector('input[type=password]')
const form = document.querySelector('form')
const passwordError = document.querySelector('span#password-error')


validatePasswordField()
validateEmailField()

form.addEventListener('submit' ,(event) =>{
    
    if(form.checkValidity()){
        form.submit()
    } else{
        event.preventDefault()
    }
})

function validateEmailField(){
    const emailError = document.querySelector('span#email-error')
    emailField.addEventListener('blur', () =>{
        if(emailField.validity.valueMissing){
            emailError.textContent = 'Email Field is required'
            emailError.classList.remove('hidden')
        }
        if(emailField.validity.typeMistmatch){
            emailError.textContent = 'Invalid Email'
            emailError.classList.remove('hidden')
        }

        if(emailField.validity.valid){
            emailError.textContent = ''
            emailError.classList.add('hidden')
        }
    })
}

function validatePasswordField(){
    passwordField.addEventListener('blur', () =>{
        if(passwordField.validity.valueMissing){
            passwordError.textContent = 'Password Field is required'
            passwordError.classList.remove('hidden')
        } 

        if(passwordField.validity.valid){
            passwordError.textContent = ''
            passwordError.classList.add('hidden')
        }
    })
}