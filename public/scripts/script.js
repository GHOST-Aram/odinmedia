const footer = document.querySelector('footer')

//Modify text content:  Add Year
footer.textContent = footer.textContent.concat(new Date().getFullYear())