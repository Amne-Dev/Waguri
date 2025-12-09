const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
	navToggle.addEventListener('click', () => {
		navToggle.classList.toggle('active');
		navLinks.classList.toggle('open');
	});

	navLinks.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			if (navLinks.classList.contains('open')) {
				navLinks.classList.remove('open');
				navToggle.classList.remove('active');
			}
		});
	});
}
