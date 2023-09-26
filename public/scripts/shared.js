const shareBtns = getAllElements('button.share-btn')
shareBtns.forEach(btn =>{
    btn.addEventListener('click', () =>{
        alert('Feature is coming soon.')
    })
})