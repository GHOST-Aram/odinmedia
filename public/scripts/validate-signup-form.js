const form = document.querySelector('form')
const firstNameField = document.querySelector('input#first-name')
const firstNameError = document.querySelector('span#first-name-error')

const lastNameField = document.querySelector('input#last-name')
const lastNameError = document.querySelector('span#last-name-error')

const passwordField = document.querySelector('input#password')
const passwordError = document.querySelector('span#password-error')

const password2Field = document.querySelector('input#password2')
const password2Error = document.querySelector('span#password-2-error')

const emailField = document.querySelector('input[type=email]')
const emailError = document.querySelector('span#email-error')

password2Field.addEventListener('input', (event) =>{
    if(password2Field.value !== passwordField.value){
        password2Field.setCustomValidity('Password Mismatch')
        password2Error.textContent = 'Password should be identical'
        password2Error.classList.remove('hidden')
    } else{
        password2Field.setCustomValidity('')
        password2Error.textContent = ''
        password2Error.classList.add('hidden')
    }
})
validateField(emailField, emailError)
validateField(firstNameField, firstNameError)
validateField(lastNameField, lastNameError)
validateField(passwordField, passwordError)    
validateField(password2Field, password2Error)

form.addEventListener('submit', (event) =>{
    
    if(form.checkValidity()){
        form.submit()
    } else{
        event.preventDefault()
    }
})



function validateField(fieldNode, errorNode){
    fieldNode.addEventListener('blur', () =>{
        if(fieldNode.validity.valueMissing){
            errorNode.textContent = 'Field is required'
            errorNode.classList.remove('hidden')
        }
    
        if(fieldNode.validity.typeMismatch){
            errorNode.textContent = 'Invalid Input'
            errorNode.classList.remove('hidden')
        }

        if(fieldNode.validity.valid){
            errorNode.textContent = ''
            errorNode.classList.add('hidden')
        }
    })
}

