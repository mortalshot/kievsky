// Подключение функционала 
import { isMobile } from "./functions.js";
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


window.addEventListener('DOMContentLoaded', gsapAnimations);
window.addEventListener("load", function (e) {
  ScrollTrigger.refresh();
})