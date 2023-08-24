document.addEventListener('DOMContentLoaded', function () {
// start

const headAnimation = document.querySelector('.wish-list__head');
  gsap.from(headAnimation, {
    y: -100,
    opacity: 0,
		delay: 1,
    duration: 1,
    ease: 'power2.out',
  });

// end
});