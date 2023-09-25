const shareBtns = getAllElements('button.share-btn')
shareBtns.forEach(btn =>{
    btn.addEventListener('click', alertUser)
})