const navbar = document.querySelector('.navbar');
const showNav = document.querySelector('.hamburger');
const closeNav = document.querySelector('.close-nav');
const body = document.querySelector('body');

showNav.addEventListener('click', function() {
    navbar.style.display = 'flex';
    closeNav.style.display = 'block';
    body.style.overflow = 'hidden';
});
closeNav.addEventListener('click', function(){
    navbar.style.display = 'none';
    closeNav.style.display = 'none';
    body.style.overflow = 'scroll';
});