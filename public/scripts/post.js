// Get interactionn buttons
const commentBtns = document.querySelectorAll('button.comment-btn')
const likeBtns = document.querySelectorAll('button.like-btn')
const shareBtns = document.querySelectorAll('button.share-btn')
const closeAlertDialogButton = document.querySelector('button#confirm-share')
const shareAlertDialogContainer = document.querySelector('div.confirm-share')




commentBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        //Find  current post node
        const post = btn.parentElement.parentElement
        
        //Mark as current post
        post.setAttribute('id', 'current-post')
        
        //Get comment node and elements for current post
        const commentForm = document.querySelector('#current-post .comment-form')
        const textArea = document.querySelector('#current-post textarea')
        const replyBtn = document.querySelector('#current-post .comment-form button')
    
        // diaplay comment form
        commentForm.classList.toggle('hidden')
        textArea.focus()
        

        
        replyBtn.addEventListener('click', (e) =>{
            
            if(textArea.value.trim() !== ''){
                const commentText = createTextNode(textArea.value)
                const commentAuthorContainer = createCommentAuthorContainer({
                    authorName: 'James Jacobs',
                    authorImageSrc: 'https://randomuser.me/api/portraits/men/83.jpg'
                })
                
                const commentContainer = createCommentContainer()
                commentContainer.appendChild(commentAuthorContainer)
                commentContainer.appendChild(commentText)
                
                const replies = document.querySelector('#current-post .comments') 
                replies.prepend(commentContainer)

                textArea.value = ''
                commentForm.classList.toggle('hidden')
            }
        })
    })
})

likeBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        btn.classList.toggle('text-red-500')
    })
})

shareBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        shareAlertDialogContainer.classList.toggle('hidden')
        closeAlertDialogButton.focus()
    })
})

closeAlertDialogButton.addEventListener('click', () =>{
    shareAlertDialogContainer.classList.add('hidden')
})


const createCommentAuthorContainer = ({
    authorName, authorImageSrc
}) =>{
    const commentAuthorImage = document.createElement('img')
    commentAuthorImage.src = authorImageSrc
    commentAuthorImage.className = 'h-8 w-8 rounded-full'
    
    const commentAuthorName = document.createElement('h1')
    commentAuthorName.textContent = authorName
    
    
    const commentAuthorContainer = document.createElement('div')
    commentAuthorContainer.className = 'flex flex-row gap-2 items-center'
    commentAuthorContainer.appendChild(commentAuthorImage)
    commentAuthorContainer.appendChild(commentAuthorName)

    return commentAuthorContainer
}

const createCommentContainer = () =>{
    const commentContainer=document.createElement('div')
    commentContainer.className = 'p-2 rounded-sm bg-slate-300'

    return commentContainer
}

const createTextNode = (text) =>{
    const commentText = document.createElement('p')
    commentText.textContent = text
    commentText.className = 'font-light text-md text-gray-900'
    
    return commentText
}

