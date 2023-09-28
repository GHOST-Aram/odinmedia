const bannerBtn = document.querySelector('button#banner-btn')
const pictureBtn = document.querySelector('button#picture-btn')
const bannerFilePicker = document.querySelector('input[type=file]#banner')
const banner = document.querySelector('#banner')

bannerBtn.addEventListener('click', () => {
    bannerFilePicker.click()

})

bannerFilePicker.addEventListener('input', () =>{
    console.log(bannerFilePicker.value)
})
pictureBtn.addEventListener('click', () => {
    const pictureFilePicker = document.querySelector('input[type=file]#picture')
    pictureFilePicker.click()
})