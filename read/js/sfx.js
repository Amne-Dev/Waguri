const waguri = document.querySelector('.logo');
if (!waguri) {
  throw new Error('Logo element not found');
}
waguri.setAttribute('draggable', 'false');
waguri.addEventListener('selectstart', (event) => event.preventDefault());
waguri.addEventListener('dragstart', (event) => event.preventDefault());
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

const muteButton = document.getElementById('muteButton');
const icon = muteButton.querySelector('i');
let isMuted = false;

muteButton.addEventListener('click', () => {
  isMuted = !isMuted;
  sfx.muted = isMuted;

  // Update icon
  if (isMuted) {
    icon.classList.remove('fa-volume-up');
    icon.classList.add('fa-volume-mute');
  } else {
    icon.classList.remove('fa-volume-mute');
    icon.classList.add('fa-volume-up');
  }
});

const MAX_ACTIVE_CONFETTI = 40;
let activeConfetti = 0;

waguri.addEventListener('click', () => {
  // Two cannons: left and right edges shooting inward/up
  const burst = 18; // per cannon, restored density
  fireCannon('left', burst);
  fireCannon('right', burst);
});

// Cannon helper
function fireCannon(side, count) {
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const originX = side === 'left' ? 0 : screenW;
  const originY = screenH - 80; // near bottom
  const horizontalSign = side === 'left' ? 1 : -1;

  for (let i = 0; i < count; i++) {
    if (activeConfetti >= MAX_ACTIVE_CONFETTI) {
      break; // avoid flooding DOM
    }
    const clone = waguri.cloneNode(true);
    clone.classList.add('logo-confetti');
    clone.setAttribute('draggable', 'false');
    clone.style.userSelect = 'none';

    // Randomized angle and speed
    const angleDeg = 20 + Math.random() * 40; // 20°–60°
    const speed = 600 + Math.random() * 500;  // px/s
    const angleRad = angleDeg * Math.PI / 180;

    const vx = horizontalSign * Math.cos(angleRad) * speed;
    const vy = -Math.sin(angleRad) * speed; // up

    // Random spin and scale
    const spinBase = (180 + Math.random() * 360) * (Math.random() > 0.5 ? 1 : -1);
    const scale = 0.7 + Math.random() * 0.6;

    // Position at cannon mouth
    clone.style.left = originX + 'px';
    clone.style.top = originY + 'px';

    // Append before animating so WAAPI can target it
    document.body.appendChild(clone);

    // Stagger for nicer burst
    const delaySeconds = (i * 0.015) + Math.random() * 0.04;
    const durationMs = 1000 + Math.random() * 220;

    const pathFrames = [
      { progress: 0, extraY: 0, opacity: 1, spinFactor: 0 },
      { progress: 0.25, extraY: 60, opacity: 1, spinFactor: 1 },
      { progress: 0.5, extraY: 150, opacity: 0.85, spinFactor: 1.6 },
      { progress: 0.75, extraY: 270, opacity: 0.55, spinFactor: 2.2 },
      { progress: 1, extraY: 420, opacity: 0, spinFactor: 3 },
    ];

    const keyframes = pathFrames.map((frame) => {
      const tx = vx * frame.progress;
      const ty = vy * frame.progress + frame.extraY;
      const spin = spinBase * frame.spinFactor;
      return {
        transform: `translate(${tx}px, ${ty}px) rotate(${spin}deg) scale(${scale})`,
        opacity: frame.opacity,
      };
    });

    activeConfetti++;
    const animation = clone.animate(keyframes, {
      duration: durationMs,
      easing: 'cubic-bezier(0.2, 0.8, 0.25, 1)',
      delay: delaySeconds * 1000,
      fill: 'forwards',
    });

    animation.finished
      .catch(() => null)
      .finally(() => {
        activeConfetti = Math.max(10, activeConfetti - 1);
        clone.remove();
      });
  }
}