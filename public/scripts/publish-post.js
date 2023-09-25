const publishBtn = document.querySelector('button#publish-post')
const textArea = document.querySelector('textarea#new-post')

publishBtn.addEventListener('click', async() =>{
    if(!textArea.value.trim() === ''){
        publishBtn.disable()
        publishBtn.textContent = 'Publishing ...'

        const postData = {
            text: textArea.value,
            likes: 0,
            shared: 0,
            comments: 0
        }

        try {
            const response = await fetch('localhost:8000/content/post', {
                method: 'POST',
                body: JSON.stringify(postData),
                mode: 'cors',
            })

            response.post? window.location.reload() : console.error(response.error)

        } catch (error) {
            console.error('Unexpected error occured: ', error)
        } finally{
            publishBtn.textContent = 'Publish Post'
            publishBtn.enable()
        }
        
    }
})


