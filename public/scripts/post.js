// Get interactionn buttons
const commentBtns = document.querySelectorAll('button.comment-btn')
const likeBtns = document.querySelectorAll('button.like-btn')
const shareBtns = document.querySelectorAll('button.share-btn')




commentBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        const post = getParentPost(btn)        
        
        setId(post, 'current-post')                
        toggleCommentForm()
        
        const replyBtn = getElement('#current-post .comment-form button')
        replyBtn.addEventListener('click', (e) =>{
            const textArea = document.querySelector('#current-post textarea')
            
            if(textArea.value.trim() !== ''){
                const commentText = createTextNode(textArea.value)
                const commentAuthorContainer = createCommentAuthorContainer({
                    authorName: 'James Jacobs',
                    authorImageSrc: 'https://randomuser.me/api/portraits/men/83.jpg'
                })
                
                const commentContainer = createCommentContainer()
                commentContainer.appendChild(commentAuthorContainer)
                commentContainer.appendChild(commentText)
                
                renderComment(commentContainer)
                hideCommentForm()
                
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
    btn.addEventListener('click', alertUser)
})


function alertUser(){
    const closeAlertDialogButton = document.querySelector('button#confirm-share')
    const shareAlertDialogContainer = document.querySelector('div.confirm-share')
    
    shareAlertDialogContainer.classList.toggle('hidden')
    closeAlertDialogButton.focus()

    closeAlertDialogButton.addEventListener('click', () =>{
        shareAlertDialogContainer.classList.add('hidden')
    })
}

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
const getElement = (params) =>{
    return document.querySelector(params)
}

const getParentPost = (element) =>{
    const post = element.parentElement.parentElement

    return post
}
const hideCommentForm = () =>{
    const commentForm = document.querySelector('#current-post .comment-form')
    const textArea = document.querySelector('#current-post textarea')

    textArea.value = ''
    commentForm.classList.add('hidden')
}

const renderComment = (commentContainer) =>{
    const replies = document.querySelector('#current-post .comments') 
    replies.prepend(commentContainer)
}
const setId = (post, id) =>{
    post.setAttribute('id', id)

}

const toggleCommentForm = () =>{
    const commentForm = document.querySelector('#current-post .comment-form')
    const textArea = document.querySelector('#current-post textarea')
    commentForm.classList.toggle('hidden')
    if(!commentForm.classList.contains('hidden')){
        textArea.focus()
    }
}