const mainNav = document.querySelector('.navigation')
const hamButton = document.querySelector('#menu');
const header = document.querySelector('header');

hamButton.addEventListener('click', () => {
	mainNav.classList.toggle('show');
    header.classList.toggle('menu-open');
	hamButton.classList.toggle('show');
});


document.getElementById("lastModified").innerHTML =`Last Modified: ${document.lastModified}`;
document.getElementById("current-year").innerHTML = new Date().getFullYear();