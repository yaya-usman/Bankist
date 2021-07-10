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

tabsContainer.addEventListener('click', e=>{
    const clicked = e.target.closest('.operations__tab');

    //gaurd clause
    if(!clicked) return;

    //remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    //activate tab
    clicked.classList.add('operations__tab--active');

    //activate content
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})


//Menu Fade animation
const handleHover = function(e){
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
}

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1));

//Implementing the sticky nav

const initiCoords = section1.getBoundingClientRect();

//the inefficient way but still works
// window.addEventListener('scroll', ()=>{
//     if(window.scrollY > initiCoords.top) nav.classList.add('sticky')
//     else nav.classList.remove('sticky')
// })


//using Intersection observer API 
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function(entries){
  const [entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');

}

const obsOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}

const headerObserver = new IntersectionObserver(obsCallback, obsOption);
headerObserver.observe(header);

//reveal section

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);

}


const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(section =>{
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
})