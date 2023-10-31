const form = document.querySelector('form')
const firstNameField = document.querySelector('input#first-name')
const lastNameField = document.querySelector('input#last-name')
const city = document.querySelector('input#city')
const region = document.querySelector('input#region')
const bannerFile = document.querySelector('.banner input[type=file]')
const bannerUrl = document.querySelector('.banner input[type=url]')
const pictureFile = document.querySelector('.picture input[type=file]')
const pictureUrl = document.querySelector('.picture input[type=url]')

// Error fields 
const firstNameError = document.querySelector('.first-name span.hidden')
const lastNameError = document.querySelector('.last-name span.hidden')
const pictureError = document.querySelector('.picture span.hidden')
const bannerError = document.querySelector('.banner span.hidden')
const locationError = document.querySelector('.location span.hidden')

// Validate name field 
firstNameField.addEventListener('input', (e) => {
    if(firstNameField.validity.valueMissing){
        firstNameError.textContent = 'Name Field is Required.'
        firstNameError.classList.remove('hidden')
        firstNameField.classList.add('border-red-500')
    } else if(firstNameField.validity.tooShort){
        firstNameError.textContent = 'Name is too short.'
        firstNameError.classList.remove('hidden')
        firstNameField.classList.add('border-red-500')
    } else if(firstNameField.validity.valid){
        firstNameError.textContent = ''
        firstNameError.classList.add('hidden')
        firstNameField.classList.remove('border-red-500')
    } 
})

// Validate name field 
lastNameField.addEventListener('input', (e) => {
    if(lastNameField.validity.valueMissing){
        lastNameError.textContent = 'Name Field is Required.'
        lastNameError.classList.remove('hidden')
        lastNameField.classList.add('border-red-500')
    } else if(lastNameField.validity.tooShort){
        lastNameError.textContent = 'Name is too short.'
        lastNameError.classList.remove('hidden')
        lastNameField.classList.add('border-red-500')
    } else if(lastNameField.validity.valid){
        lastNameError.textContent = ''
        lastNameError.classList.add('hidden')
        lastNameField.classList.remove('border-red-500')
    } 
})

form.addEventListener('submit', (e) => {
    firstNameField.value = firstNameField.value.trim()
    city.value = city.value.trim()
    region.value = region.value.trim()
    bannerFile.value = bannerFile.value.trim()
    bannerUrl.value = bannerUrl.value.trim()
    pictureFile.value = pictureFile.value.trim()
    pictureUrl.value = pictureUrl.value.trim()

    //Validate profile picture
    if(!Boolean(pictureUrl.value) && !Boolean(pictureFile.value)){
        pictureFile.setCustomValidity('Provide either file or url')
        pictureUrl.setCustomValidity('Provide either file or url')
        pictureError.textContent = 'Provide atleast one, either file or external url'
        pictureError.classList.remove('hidden')
    } else {
        pictureFile.setCustomValidity('')
        pictureUrl.setCustomValidity('')
        pictureError.textContent = ''
        pictureError.classList.add('hidden')
    }
    
    //Validate banner
    if(!Boolean(bannerUrl.value) && !Boolean(bannerFile.value)){
        bannerFile.setCustomValidity('Provide either file or url')
        bannerUrl.setCustomValidity('Provide either file or url')
        bannerError.textContent = 'Provide atleast one, either file or external url'
        bannerError.classList.remove('hidden')
    } else {
        bannerFile.setCustomValidity('')
        bannerUrl.setCustomValidity('')
        bannerError.textContent = ''
        bannerError.classList.add('hidden')
    }

    //Validate city | If region is provided, city must be provided
    if(Boolean(city.value) && !Boolean(region.value)){
        region.setCustomValidity('required')
        locationError.textContent = 'If city is given, region goes as well.'
        locationError.classList.remove('hidden')
    } else if(!Boolean(city.value) && Boolean(region.value)){
        city.setCustomValidity('required')
        locationError.textContent = 'If region is given, city goes as well.'
        locationError.classList.remove('hidden')
    } else {
        region.setCustomValidity('')
        city.setCustomValidity('')
        locationError.textContent = ''
        locationError.classList.add('hidden')
    }

    if(form.checkValidity()) {
        form.submit()
    } else {
        e.preventDefault()
    }
})