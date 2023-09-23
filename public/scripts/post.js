// Get interactionn buttons
const commentBtns = document.querySelectorAll('button.comment-btn')
const likeBtns = document.querySelectorAll('button.like-btn')
const shareBtns = document.querySelectorAll('button.share-btn')

//Create elements
const textArea = document.createElement('textarea')
const sendBtn = document.createElement('button')
const commentText = document.createElement('p')
const commentAuthorImage = document.createElement('img')
const commentAuthorName = document.createElement('h1')
const commentAuthorContainer = document.createElement('div')

const commentContainer=document.createElement('div')

//Add author name and image nodes
commentAuthorContainer.appendChild(commentAuthorImage)
commentAuthorContainer.appendChild(commentAuthorName)

//Add username and image nodes to comment container node 
commentContainer.appendChild(commentAuthorContainer)
commentContainer.appendChild(commentText)

//Styles
commentAuthorContainer.className = 'flex flex-row gap-2 items-center'
commentAuthorImage.className = 'h-8 w-8 rounded-full'
textArea.className = (
    `w-full font-light p-2 bg-slate-400 
    border rounded-sm text-sm text-white`
)
sendBtn.className = ('bg-blue-500 text-white font-md px-4 py-2 rounded-sm')
commentText.className = 'font-light text-md text-gray-500'
commentContainer.className = 'p-2 rounded-sm bg-slate-300'


sendBtn.textContent = 'SEND'


commentBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        const post = btn.parentElement.parentElement
        
        post.appendChild(textArea)
        post.appendChild(sendBtn)
        textArea.focus()

        sendBtn.addEventListener('click', (e) =>{
            
            commentText.textContent = textArea.value
            commentAuthorName.textContent = 'Erick Juoles'
            commentAuthorImage.src = 'https://randomuser.me/api/portraits/men/83.jpg'

            post.appendChild(commentContainer)

            post.removeChild(textArea)
            post.removeChild(sendBtn)
        })


    })
})

likeBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        btn.classList.toggle('text-red-500')
    })
})

