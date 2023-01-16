const btnMenu = document.querySelectorAll(".animacion")

for (let i = 0; i < btnMenu.length; i++) {
    btnMenu[i].classList.add('animate__animated','animate__fadeInLeftBig')
    btnMenu[i].style.setProperty('--animate-duration', '0.9s');
}

const homeImg = document.querySelector(".homeImg")
homeImg.classList.add('animate__animated','animate__fadeIn')
homeImg.style.setProperty('--animate-duration', '3.0s');



