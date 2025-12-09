const waguri = document.querySelector('.logo');
const sfx = new Audio('sfx/unyah.mp3');
sfx.loop = true
sfx.playbackRate = 1.25
sfx.volume = 0.4
waguri.addEventListener('mouseenter', () => {
    sfx.currentTime = 0;
    sfx.play();
});

waguri.addEventListener('mouseleave', () => {
    sfx.pause();
});

document.getElementById('audioUnlock').addEventListener('click', () => {
  // This first click unlocks audio
  document.getElementById('audioUnlock').style.display = 'none';
});