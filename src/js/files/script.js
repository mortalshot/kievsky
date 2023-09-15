// Подключение функционала 
import { isMobile, removeClasses } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Выводим в DOM высоту шапки страницы
window.addEventListener('DOMContentLoaded', showHeaderHeight);
window.addEventListener('resize', showHeaderHeight);

function showHeaderHeight() {
  const top = document.querySelector('.top');
  const header = document.querySelector('.header');
  document.documentElement.style.setProperty('--header-height', `${header.offsetHeight + top.offsetHeight}px`);
}

function gsapAnimations() {
  // Анимация появления этажей здания в шаблоне layout3
  const layout3 = document.querySelector('.layout3');
  if (layout3 && window.innerWidth > 767.98) {
    const buildingFloors = layout3.querySelectorAll('.scheme-level');
    let layout3AnimationSize = 500;

    // Высчитываем высоту, на которую фиксируем экран
    if (buildingFloors.length > 0) {
      buildingFloors.forEach(element => {
        layout3AnimationSize += 500;
      });
    }

    // Плавное появление этажей здания
    const level1Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: layout3,
        start: '500px bottom',
        end: '1000px bottom',
        scrub: true,
      },
    })
    level1Timeline.from("#level1", {
      opacity: 0,
      yPercent: -100
    })

    const level2Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: layout3,
        start: '1000px bottom',
        end: '1500px bottom',
        scrub: true,
      },
    })
    level2Timeline.from("#level2", {
      opacity: 0,
      yPercent: -100
    })

    const level3Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: layout3,
        start: '1500px bottom',
        end: '2000px bottom',
        scrub: true,
      },
    })
    level3Timeline.from("#level3", {
      opacity: 0,
      yPercent: -100
    })

    const level4Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: layout3,
        start: '2000px bottom',
        end: '2500px bottom',
        scrub: true,
      },
    })
    level4Timeline.from("#level4", {
      opacity: 0,
      yPercent: -100
    })

    // Фиксируем страницу
    gsap.to(layout3, {
      scrollTrigger: {
        trigger: layout3,
        start: "center center",
        end: `${layout3AnimationSize}px bottom`,
        scrub: true,
        pin: true,
      },
    });
  }
}

// Работа с видео в видеогалерее
const videos = document.querySelectorAll('.layout7__item-media');
if (videos.length > 0) {
  videos.forEach(element => {
    element.addEventListener('click', function () {
      const video = element.querySelector('video');

      if (video.paused) {
        video.setAttribute("controls", "controls")
        setTimeout(() => {
          video.play();
        }, 100);
        element.classList.remove('_paused')
      } else {
        video.removeAttribute("controls")
        video.pause();
        element.classList.add('_paused')
      }
    })
  });
}

// Фильтрация магазинов по названию
const template6Search = document.querySelector('.template6__search input');
const template6Items = document.querySelectorAll('.template6-item__name');

if (template6Search && template6Items.length > 0) {
  template6Search.addEventListener('input', function () {
    var query = this.value.toLowerCase();

    for (var i = 0; i < template6Items.length; i++) {
      var text = template6Items[i].textContent.toLowerCase();
      let itemParent = template6Items[i].closest('.template6-item');

      if (text.indexOf(query) !== -1) {
        // Если элемент содержит введенный текст, то он отображается
        itemParent.style.display = 'block';
      } else {
        // Если элемент не содержит введенный текст, то он скрывается
        itemParent.style.display = 'none';
      }
    }
  })
}

// Схема комплекса
const tradeArea = document.querySelectorAll('.trade-area');
if (tradeArea.length > 0) {
  tradeArea.forEach(area => {
    // Подсвечиваем площадь при наведении
    area.addEventListener('mouseover', function () {
      const areaID = area.dataset.id;
      const selectItem = document.querySelectorAll(`[data-id="${areaID}"]`);

      removeClasses(tradeArea, '_hover');
      selectItem.forEach(element => {
        element.classList.add('_hover');
      });
    })

    area.addEventListener('mouseout', function () {
      removeClasses(tradeArea, '_hover');
    })

    // Наполняем контентом попап магазина
    area.addEventListener('click', function () {
      const popupMain = document.querySelector('.store .popup__text');
      const areaID = area.dataset.id;
      const infoStore = document.querySelector(`.info-store[data-id=${areaID}]`);
      const storePreview = infoStore.querySelector('.info-store__preview');
      const storeLogo = infoStore.querySelector('.info-store__logo');
      const storeSchedule = infoStore.querySelector('.info-store__schedule');
      const storeFloor = infoStore.querySelector('.info-store__floor');
      const storeTitle = infoStore.querySelector('.info-store__title');
      const storeCategory = infoStore.querySelector('.info-store__category');
      const storeText = infoStore.querySelector('.info-store__text');
      const storeLink = infoStore.querySelector('.info-store__link');
      const storeGallery = infoStore.querySelector('.store__gallery-list');

      console.log(storeGallery);

      // Добавляем фоновую картинку
      if (storePreview.textContent) {
        popupMain.querySelector('.store__preview').classList.add('_filled');

        popupMain.querySelector('.store__preview').innerHTML = `
          <img src="${storePreview.textContent}" alt="">

          <button data-close type="button" class="popup__close _icon-close"></button>
        `;
      }

      // Добавляем логотип компании
      if (storeLogo.textContent) {
        popupMain.querySelector('.store__logo').innerHTML = `
          <img src="${storeLogo.textContent}" alt="">
        `;
      }

      // Добавляем расписание компании
      if (storeSchedule.textContent) {
        popupMain.querySelector('.store-schedule__body').innerHTML = storeSchedule.outerHTML;
      }

      // Добавляем этаж, на котором находится магазин
      if (storeFloor.textContent) {
        popupMain.querySelector('.store__location-floor span').innerHTML = storeFloor.textContent;
      }

      // Добавляем название компании
      if (storeTitle.textContent) {
        popupMain.querySelector('.store__title').innerHTML = storeTitle.textContent;
      }

      // Добавляем название компании
      if (storeCategory.textContent) {
        popupMain.querySelector('.store__category').innerHTML = storeCategory.textContent;
      }

      // Добавляем описание компании
      if (storeText.textContent) {
        popupMain.querySelector('.store__text').innerHTML = storeText.textContent;
      }

      // Добавляем ссылку на магазин
      if (storeLink.textContent) {
        popupMain.querySelector('.store__link').innerHTML = `
          <a href="${storeLink.textContent}" target="_blank">
            <i class="link__arrow"></i>
            <span class="link__text">Подробнее</span>
          </a>
        `;
      }

      // Добавляем галерею компании
      if (storeGallery.textContent) {
        popupMain.querySelector('.store__gallery').innerHTML = storeGallery.outerHTML;
      }
    })
  });
}

// Поиск магазина на схеме комплекса
const schemeSearch = document.querySelector('.scheme-search__input');
const schemeStores = document.querySelectorAll('.scheme-search__store');

if (schemeSearch) {
  schemeSearch.addEventListener('input', function () {
    var query = this.value.toLowerCase();

    for (var i = 0; i < schemeStores.length; i++) {
      var text = schemeStores[i].textContent.toLowerCase();
      if (text.indexOf(query) !== -1) {
        // Если элемент содержит введенный текст, то он отображается
        schemeStores[i].style.display = 'flex';
      } else {
        // Если элемент не содержит введенный текст, то он скрывается
        schemeStores[i].style.display = 'none';
      }
    }
  })
}

// Код работает только на странице Схема комплекса
if (document.body.classList.contains('page-template-scheme')) {
  const url = window.location.href;
  const parts = url.split('?');

  // Выделение цветом нужного магазина после перехода по ссылке "Показать на карте"
  if (parts.length > 1) {
    const paramIndex = parts[1].indexOf('dataId=');
    const paramValue = parts[1].substring(paramIndex + 7);

    const selectItem = document.querySelectorAll(`[data-id="${paramValue}"]`);
    selectItem.forEach(element => {
      element.classList.add('_hover');
    });

    // Очищаем строку браузера
    const clearedUrl = url.split('?')[0];
    window.history.pushState({}, '', clearedUrl);
  }
}


document.addEventListener("afterPopupClose", function (e) {
  const currentPopup = e.detail.popup;

  // Обнуляем попап компании
  if (currentPopup.hash == "#store-info") {
    const popupPreview = document.querySelector('.store .store__preview');
    const popupLogo = document.querySelector('.store .store__logo');
    const popupText = document.querySelector('.store .store__text');
    const popupLink = document.querySelector('.store .store__link');
    const popupGallery = document.querySelector('.store .store__gallery');

    // Обнуляем превью попапа
    popupPreview.classList.remove('_filled');
    popupPreview.innerHTML = `
      <button data-close type="button" class="popup__close _icon-close"></button>
    `;

    // Обнуляем лого компании
    popupLogo.innerHTML = " ";

    // Обнуляем описание компании
    popupText.innerHTML = " ";

    // Обнуляем ссылку на компанию
    popupLink.innerHTML = " ";

    // Обнуляем галерею компании
    popupGallery.innerHTML = " ";
  }
});



window.addEventListener('DOMContentLoaded', gsapAnimations);
window.addEventListener("load", function (e) {
  ScrollTrigger.refresh();
})
