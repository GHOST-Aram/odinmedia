const publishBtn = document.querySelector('section#posts .new-post button')
const textArea = document.querySelector('section#posts .new-post textarea')

publishBtn.addEventListener('click', async() =>{
    console.log('Elons')
    console.log('Publising post', textArea.value)
    if(textArea.value.trim() !== ''){
        changeButtonText('Publishing ...')
        disableButton(publishBtn)

        const postData = {
            text: textArea.value,
            likes: 0,
            shared: 0,
            comments: 0
        }

        try {
            const response = await fetch('http://localhost:8000/content/post', {
                method: 'POST',
                body: JSON.stringify(postData),
                mode: 'cors',
                headers: {
                    "Content-type": "application/json"
                }
            })
            console.log(postData)
            console.log(response)
            response.post? window.location.reload() : console.error(response.error)

        } catch (error) {
            console.error('Unexpected error occured: ', error)
        } finally{
            changeButtonText('Publish Post')
            enableButton()
        }
        
    }
})

const disableButton = () =>{
    publishBtn.setAttribute('disabled', 'true')
    publishBtn.classList.add('opacity-50')
}

const enableButton = () =>{
    publishBtn.removeAttribute('disabled')
    publishBtn.classList.remove('opacity-50')
}

const changeButtonText = (text) =>{
    publishBtn.textContent = text
}
