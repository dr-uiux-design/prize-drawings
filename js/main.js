"use strict"

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


/* ------------------- Modals -------------------- */
const modalBtn = document.querySelectorAll('.js-modal-btn');
const modals = document.querySelectorAll('.modal');

function openModal(elem) {
	elem.classList.add('is-active');
	if (hasScrollbar()) {
		body.style.width = `calc(100vw - ${window.innerWidth - document.documentElement.clientWidth}px)`;
	}
	body.style.overflow = 'hidden';
}

function closeModal(e) {
	if (e.target.classList.contains('modal__close') || e.target.closest('.modal__close') || e.target.classList.contains('modal__overlay')) {
		e.target.closest('.modal').classList.remove('is-active');
		body.style.overflow = '';
		body.style.width = '';
	}
}

function hasScrollbar() {
	return document.body.scrollHeight > window.innerHeight;
}

modalBtn.forEach(btn => {
	btn.addEventListener('click', (e) => {
		let data = e.target.dataset.modalOpen;

		modals.forEach(modal => {
			if (modal.dataset.modal == data || modal.dataset.modal == e.target.closest('.js-modal-btn').dataset.modalOpen) {
				openModal(modal)
			}
		})
	})
})

modals.forEach(modal => {
	modal.addEventListener('click', e => closeModal(e))
})

window.addEventListener('keydown', e => {
	modals.forEach(modal => {
		if (e.key === "Escape" && modal.classList.contains('is-active')) {
			modal.classList.remove('is-active');
			body.style.overflow = '';
			body.style.width = '';
		}
	})
})
/* ------------------- / Modals -------------------- */

// Prize Slider Mobile
let initSlider = 0;

$(window).on('resize', function (e) {
	if (window.innerWidth < 992 && initSlider !== 1) {
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
			}, {
				breakpoint: 481,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}, ]
		});
		initSlider = 1;
	} else if (window.innerWidth >= 992 && initSlider === 1) {
		$('.mob-slider').slick('unslick');
		initSlider = 0;
	}
}).trigger('resize');


// Показ и скрытие розыгрышей в истории
// const btnDrawingsMore = document.querySelector('#drawingsMore');
// const drawingsHidden = document.querySelector('.drawings__hidden');

// btnDrawingsMore.addEventListener("click", function () {
// 	if (drawingsHidden.style.display === "none") {
// 		drawingsHidden.style.display = "block";
// 		btnDrawingsMore.innerText = "Сollapse";
// 	} else {
// 		drawingsHidden.style.display = "none";
// 		btnDrawingsMore.innerText = "View all";
// 	}
// });

// Попап Аккаунта в шапке
const userAccount = document.querySelector('.user-account');
const popupSettings = document.querySelector('.popup-settings');

userAccount.addEventListener('click', () => {
	popupSettings.classList.toggle('active');
	userAccount.classList.toggle('active');
});

// Добавляем обработчик клика на документ
document.addEventListener('click', (event) => {
	if (!event.target.closest('.user-account') && popupSettings.classList.contains('active')) {
		popupSettings.classList.remove('active');
		userAccount.classList.remove('active'); // убираем класс active у кнопки
	}
});

/* ------------------- Edit Profile -------------------- */
const editBtn = document.querySelector('#edit-btn');
const updateBtn = document.querySelector('#update-btn');
const profileInputs = document.querySelectorAll('.input-profile');
const uploadAva = document.querySelector('.upload-ava');
const iconPassword = document.querySelector('.pass-yes');

editBtn.addEventListener('click', () => {
	profileInputs.forEach(input => input.removeAttribute('disabled'));
	editBtn.classList.add('is-hidden');
	updateBtn.classList.remove('is-hidden');
	uploadAva.classList.remove('is-hidden');
	iconPassword.classList.remove('is-hidden');
});

updateBtn.addEventListener('click', () => {
	profileInputs.forEach(input => input.setAttribute('value', input.value));
	profileInputs.forEach(input => input.setAttribute('disabled', true));
	updateBtn.classList.add('is-hidden');
	editBtn.classList.remove('is-hidden');
	uploadAva.classList.add('is-hidden');
	iconPassword.classList.add('is-hidden');
});

/* ------------------- Замена аватарки в профиле -------------------- */
const uploadBtn = document.querySelector('.upload-ava');
const avatarDefault = document.querySelector('#avaDefault');
const avatarNew = document.querySelector('.profile-form__ava');

uploadBtn.addEventListener('click', function () {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'image/*';
	input.onchange = function () {
		const file = this.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			avatarDefault.style.display = 'none';
			avatarNew.style.backgroundImage = `url(${this.result})`;
			avatarNew.classList.add('avatar-uploaded');
			uploadAva.classList.add('border');
		}
	}
	input.click();
});

/* ------------------- Показать / Скрыть пароль  -------------------- */
const passwordIcon = document.querySelectorAll('.ic-password');
const passwordInput = document.querySelectorAll('.input-password');

passwordIcon.forEach(function (icon, index) {
	icon.addEventListener('click', function () {
		if (passwordInput[index].type === 'password') {
			passwordInput[index].type = 'text';
			icon.classList.remove('pass-yes');
			icon.classList.add('pass-no');
		} else {
			passwordInput[index].type = 'password';
			icon.classList.remove('pass-no');
			icon.classList.add('pass-yes');
		}
	});
});

/* ------------------- Referrals -------------------- */
const referralInput = document.querySelector('.input-referral');
const referralLink = document.querySelector('.referals-link');
const referralCodeElement = document.querySelector('.referals-link__code');
const referralTooltip = document.querySelector('.referals-link__tooltip');

referralLink.addEventListener('click', () => {
	const referalCode = referralInput.value;
	navigator.clipboard.writeText(`https://sitename.com/r/${referalCode}`);
	referralTooltip.classList.add('active');
	setTimeout(() => {
		referralTooltip.classList.remove('active');
	}, 2000);
});

referralInput.addEventListener('input', () => {
	const referalCode = referralInput.value;
	referralCodeElement.textContent = referalCode;
});

/* ------------------- Modal Success  -------------------- */
const btnJoin = document.querySelector('.btn-join');
const modalConfirmation = document.querySelector('.modal-confirmation');
const modalSuccess = document.querySelector('.modal-success');
const confirmationOk = document.querySelector('.confirmation-ok');
const successOk = document.querySelector('.success-ok');

btnJoin.addEventListener('click', () => {
	modalConfirmation.classList.add('is-active');
});

confirmationOk.addEventListener('click', () => {
	modalSuccess.classList.add('is-active');
	modalConfirmation.classList.remove('is-active');
});

successOk.addEventListener('click', () => {
	modalSuccess.classList.remove('is-active');
});

/* ------------------- Couner -------------------- */
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
	const minusBtn = counter.querySelector('.counter__minus');
	const plusBtn = counter.querySelector('.counter__plus');
	const inputField = counter.querySelector('.counter__input');
	
	let counterValue = parseInt(inputField.value);

	minusBtn.addEventListener('click', () => {
		if (counterValue > 1) {
			counterValue--;
			inputField.value = counterValue;
		}
	});

	plusBtn.addEventListener('click', () => {
		counterValue++;
		inputField.value = counterValue;
	});

	const selectBtns = counter.querySelectorAll('.selects-tickets__btn');

	selectBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			counterValue = parseInt(btn.textContent);
			inputField.value = counterValue;
			selectBtns.forEach(btn => {
				btn.classList.remove('active');
			});
			btn.classList.add('active');
		});
	});
});



/* ------------------- Tabs -------------------- */
const tabBuy = document.getElementById("tab-buy");
const tabSell = document.getElementById("tab-sell");
const paymentBuy = document.getElementById("payment-buy");
const paymentSell = document.getElementById("payment-sell");
const formBuy = document.getElementById("buy-form");
const formSell = document.getElementById("sell-form");

tabSell.addEventListener('click', () => {
	tabSell.classList.add('active');
	tabBuy.classList.remove('active');

	formSell.classList.add('is-active');
	formSell.classList.remove('is-hidden');
	formBuy.classList.add('is-hidden');

	paymentBuy.classList.add('is-hidden');
	paymentBuy.classList.remove('is-active');
	paymentSell.classList.add('is-active');
	paymentSell.classList.remove('is-hidden');
});

tabBuy.addEventListener('click', () => {
	tabSell.classList.remove('active');
	tabBuy.classList.add('active');

	formSell.classList.remove('is-active');
	formSell.classList.add('is-hidden');
	formBuy.classList.remove('is-hidden');

	paymentSell.classList.remove('is-active');
	paymentSell.classList.add('is-hidden');
	paymentBuy.classList.add('is-active');
	paymentBuy.classList.remove('is-hidden');
});

/* ------------------- Slider Waiting Drawing -------------------- */
$('.waiting-drawing-slider').slick({
  arrows: false,
  dots: true,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 500, // Установите значение speed на более низкое значение, например 500
  pauseOnHover: true,
  dots: false,
  draggable: true,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 844,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 599,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
  ]
});