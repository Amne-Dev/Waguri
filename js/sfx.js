const waguri = document.querySelector('.logo');
const sfx = new Audio('sfx/unyah.mp3');
sfx.loop = true
sfx.playbackRate = 1.25
waguri.addEventListener('mouseenter', () => {
    sfx.currentTime = 0;
    sfx.play();
});

waguri.addEventListener('mouseleave', () => {
    sfx.pause();
});