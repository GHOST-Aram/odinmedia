const menuBtn = document.querySelector('button#menu')
const sideDrawer = document.querySelector('aside#side-drawer')

menuBtn.addEventListener('click', () => {
    sideDrawer.classList.toggle('hidden')
})