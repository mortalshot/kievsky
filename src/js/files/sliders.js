/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Autoplay, EffectFade, Navigation, Parallax, Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

function initSliders() {
	if (document.querySelector('.template1__slider')) {
		new Swiper('.template1__slider', {
			modules: [Parallax, Pagination, Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 800,
			parallax: true,


			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			pagination: {
				el: '.template1__slider .swiper-pagination',
				clickable: true,
				dynamicBullets: true
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.template1__slider .swiper-button-prev',
				nextEl: '.template1__slider .swiper-button-next',
			},

			// События
			on: {

			}
		});
	}

	if (document.querySelector('.template5__slider')) {
		let template5SliderMd3 = window.matchMedia('(min-width: 767.98px)');
		var init = false;
		let template5Slider;

		function template5SliderHandleMd3Change(e) {
			if (e.matches) {
				if (!init) {
					init = true;

					template5Slider = new Swiper('.template5__slider', {
						modules: [],
						observer: true,
						observeParents: true,
						slidesPerView: 1.05,
						spaceBetween: 20,
						autoHeight: false,
						speed: 800,

						// Брейкпоинты

						breakpoints: {
							992: {
								slidesPerView: 1.1,
								spaceBetween: 20,
							},
							1280: {
								slidesPerView: 1.2,
								spaceBetween: 40,
							},
							1440: {
								slidesPerView: 1.38,
								spaceBetween: 40,
							},
							1680: {
								slidesPerView: 1.38,
								spaceBetween: 124,
							},
						},

						// События
						on: {

						}
					});
				}
			}
			else if (init) {
				template5Slider.destroy();
				init = false;
			}
		}

		template5SliderMd3.addEventListener('change', template5SliderHandleMd3Change);
		template5SliderHandleMd3Change(template5SliderMd3);
	}

	if (document.querySelector('.template10__slider')) {
		new Swiper('.template10__slider', {
			modules: [Autoplay, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 800,
			autoplay: true,
			effect: 'fade',
			loop: true,
			simulateTouch: false,
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});