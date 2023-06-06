const body = document.body; // переменная body


/* ------------------- Плавный скролл по якорным ссылкам -------------------- */

const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(anchor => {
	anchor.addEventListener('click', event => {
		event.preventDefault();

		const blockID = anchor.getAttribute('href').substring(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
});


$(window).on('resize', function (e) {
	const initSlider = $('.mob-slider').data('init-slider');

	if (window.innerWidth < 992) {
		if (initSlider !== 1) {
			$('.mob-slider').slick({
				arrows: false,
				dots: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				responsive: [{
						breakpoint: 769,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
					},
				]
			}).data('init-slider', 1);
		}
	}
	// Если десктоп
	else {
		// Если слайдер запущен
		if (initSlider === 1) {
			// Разрушаем слайдер и записываем в data init-slider = 0
			$('.mob-slider').slick('unslick').data('init-slider', 0);
		}
	}
}).trigger('resize');


// Показ и скрытие ррозыгрышей в истории
const btnDrawingsMore = document.querySelector('#drawingsMore');
const drawingsHidden = document.querySelector('.drawings__hidden');

// btnDrawingsMore.addEventListener('click', () => {
// 	drawingsHidden.classList.add('active');
// });

btnDrawingsMore.addEventListener("click", function() {
  if (drawingsHidden.style.display === "none") {
    drawingsHidden.style.display = "block";
    btnDrawingsMore.innerText = "Сollapse";
  } else {
    drawingsHidden.style.display = "none";
    btnDrawingsMore.innerText = "View all";
  }
});