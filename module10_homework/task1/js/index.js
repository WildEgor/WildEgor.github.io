const btn = document.querySelector('.j-btn');
const btnIcon = btn.querySelector('.btn__icon')
const btnIconSecons = btn.querySelector('.btn__icon-second')

btn.addEventListener('click', () => {
    btn.classList.toggle('btn--magic');
    btnIcon.classList.toggle('btn--magic');
    btnIconSecons.classList.toggle('btn--magic');
});