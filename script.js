'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//implementing smooth scroll

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//nav_links scrollintoview
// document.querySelectorAll('.nav__link').forEach(elem =>{
//   elem.addEventListener('click', (e) =>{
//       e.preventDefault();
//       document.querySelector(`${e.target.getAttribute('href')}`).scrollIntoView({behavior: 'smooth'})
//   })
// })

//using event delegation to implement above
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(`${e.target.getAttribute('href')}`)
      .scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  //gaurd clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //activate tab
  clicked.classList.add('operations__tab--active');

  //activate content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu Fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(sib => {
      if (sib !== link) {
        sib.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Implementing the sticky nav
//the inefficient way but still works

// const initiCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', ()=>{
//     if(window.scrollY > initiCoords.top) nav.classList.add('sticky')
//     else nav.classList.remove('sticky')
// })

//using Intersection observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(obsCallback, obsOption);
headerObserver.observe(header);

//reveal section
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy img loading
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

//Slider Component

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


//create dots
const createDots = () =>{
    slides.forEach((_,i) =>{
      dotContainer.insertAdjacentHTML('beforeend',
      `<button class ="dots__dot" data-slide="${i}"></button>`);
    })
}
createDots()

//active dots

const activateDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add('dots__dot--active')
}
activateDot(0)

let currSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

//next Slide
const nextSlide = function () {
  if (currSlide === maxSlide - 1) currSlide = 0;
  else {
    currSlide++;
  }
  goToSlide(currSlide)
  activateDot(currSlide)
};

//previous Slide
const prevSlide = () => {
  if (currSlide === 0) currSlide = maxSlide - 1;
  else {
    currSlide--;
  }
  goToSlide(currSlide)
  activateDot(currSlide);


};

btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);

//arrow slider
document.addEventListener('keydown', e=>{
    if(e.key === 'ArrowLeft') prevSlide()
    if(e.key === 'ArrowRight') nextSlide()
})

dotContainer.addEventListener('click', (e) =>{
  if(e.target.classList.contains('dots__dot')){
    const slide = e.target.dataset.slide;
    
      goToSlide(slide)
      activateDot(slide)
  }
})