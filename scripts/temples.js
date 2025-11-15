const mainNav = document.querySelector('#main-nav')
const hamButton = document.querySelector('#menu');
const header = document.querySelector('header');

hamButton.addEventListener('click', () => {
	mainNav.classList.toggle('show');
    header.classList.toggle('menu-open');
	hamButton.classList.toggle('show');
	hamButton.setAttribute('aria-expanded', String(hamButton.classList.contains('show')));
});


document.getElementById("lastModified").innerHTML =`Last Modified: ${document.lastModified}`;
document.getElementById("current-year").innerHTML = new Date().getFullYear();