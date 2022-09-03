'use strict';

///////////////////////////////////////
///////////Modal window///////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//////////////////////////////////////////////////////////////////////////////
////////////////////hero link handle selection/////////////////////////////////////
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
//////////////////////////////////////////////////////////////////////
/////////////////TAB COMPONENETS///////////////////
const tab = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
/////////////////////////////////////////////////////////////////////

const nav = document.querySelector('.nav');
///////////////OPEN MODAL/////////////////////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////
///Implementing smooth scrolling on BTN SCROLL

btnScrollTo.addEventListener('click', function (e) {
  //first cordinate of te btnscroll to
  //to get this cordinate we can se the .getBoundingClientRect() method
  //example

  // const s1Coords = section1.getBoundingClientRect();
  // console.log(s1Coords);
  // console.log(e.target.getBoundingClientRect()); //this will fetch the coordinates better

  // //getting the coord scroll
  // console.log(window.pageXOffset, pageYOffset);
  // console.log(
  //   //these w
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////
///SMOOTH SCROLLING NAVIGATION
//PAGE NAVIGATION
// const navLink = document.querySelectorAll('.nav__link');
// navLink.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     const scroll = document.querySelector(id);
//     scroll.scrollIntoView({ behavior: 'smooth' });
//   });
// });

//In event delegation we add event to a parent of all the element that we interested in
// add lister common parent element
//determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  const id = e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////BUILDING THE TAB CONTENT///////////////////////

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  //Remove Active tab
  tab.forEach(t => t.classList.remove('operations__tab--active'));

  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  ///Activate active tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////PASSING ARGUMENT TO EVENT HANDLER///////////////////////////////////
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//we can improve the code using the bind method istead of the soln above
//the bind() method: which create a copy of a function thta is called on,
//and it will set the this keyword in the function call to whatever value that we
//pass into bind
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////STICKY NAV//////////////////////////////////////
// const getCoord = section1.getBoundingClientRect();
// window.addEventListener('scroll', () => {
//   if (window.scrollY > getCoord.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/////////////////////////A BETTER WAY [INTERSECTION OBSERVER]///////////////////////
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   //the root is the elements that the target is intersecting
//   root: null,
//   // threshold is the percentage of intersection at which the observer callback will be called
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header'); //1
const navHeight = nav.getBoundingClientRect().height; //5
//4
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
//2
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //6
  rootMargin: `-${navHeight}px`,
});

//3
headerObserver.observe(header);
////////////////////////////////////////////////////////////////////////////
////////////////////////////REVEAL section ON SCROLL///////////////////////////////////
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  //guard clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//////////////////////////////////////////////////////
/////////////////////LAZY LOADING IMAGES/////////////////////
const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace the lazy img with the src image

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(img => imgObserver.observe(img));

/////////////////////SLIDER COMPONENT///////////////////
const sliderComponents = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  //0%,100%,200%,300%

  //making slide go right
  // btnRight.addEventListener('click', function () {
  //   if (curSlide === maxSlide - 1) {
  //     curSlide = 0;
  //   } else {
  //     curSlide++;
  //   }
  //   // slides.forEach(function (s, i) {
  //   //   s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  //   // });
  // });
  //curslide=1: -100%,0%,100%,200%

  //////////////////////////////////

  const createDot = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
      );
      //the insertAdjacentElement will make include dotson the page
    });
  };
  createDot(); // call the function to make it disply on the page

  const activeDot = function (slid) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slid}"]`)
      .classList.add('dots__dot--active');
  };
  activeDot(0);
  ///REFACTOR THE CODE: solution2
  const slidings = function (slide) {
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  slidings(0);

  //NEXTSLIDE
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    slidings(curSlide);
    activeDot(curSlide); //indicate current slide
  };

  //PRESLIDE
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    slidings(curSlide);
    activeDot(curSlide); //indicate current slide
  };

  //EVENT HANDLERS
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    // e.key === 'ArrowRight' && nextSlide();
    // e.key === 'ArrowLeft' && prevSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      slidings(slide);
      activeDot(slide); //indicate current slide
    }
  });
};
sliderComponents();
//////////////////////////////////////////////////
//////////////////LECTURE PARTS///////////////////
//////////////////////////////////////////////////
//   Selecting, Creating, and Deleting Elements
/*
//   Selecting elements
console.log(document.documentElement); // select the the entire html docment element
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');// return live collection which means that it get updated atomatically
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn')); return live collection which means that it get updated atomatically

////////////////////////////CREATING ELEMENT /////////////////////////////////////
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'we used cookie for improved functionality and analytics, <button class="btn btn--close-cookie">got it</button';
header.prepend(message);
// header.append(message);
// header.prepend(message.cloneNode(true)); // clone element incase we want more than one copy
// header.before(message); //inserting element before the header
// header.after(message); // inserting element after the header

////////delete elements/////////////////////////
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });

const mds = document.createElement('h1');
// const small = document.createElement('h3');
mds.classList.add('mds');
mds.innerHTML = 'wellcome testing <div class="btn btn-mds"> button</button';
header.append(mds);
console.log(mds);

document.querySelector('.btn-mds').addEventListener('click', function () {
  mds.remove();
});

///styles
message.style.backgroundColor = '#333';
message.style.color = 'red';
message.style.width = '120%';

console.log(message.style.backgroundColor);
// console.log(message.style.height);
// console.log(getComputedStyle(message).height);

// console.log((message.style.height = message.height + 70 + 'px'));
Number.parseFloat(getComputedStyle(message).height, 10) + 70 + 'px';
console.log(getComputedStyle(message).height);

//reading an ATTRIBUTES from html using js
const logo = document.querySelector('.nav__logo');
console.log(logo);
console.log(logo.src);
console.log(logo.alt);
console.log(logo.width);
console.log(logo.height);
console.log(logo.className);
//change alt attribute
logo.alt = 'Good img logo';

//to get an attribute from element
console.log(logo.getAttribute('src'));
logo.setAttribute('company', 'bankist');
console.log();

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data attribute are special kind of attribute that start with word data.
console.log(logo.dataset.versionNumber);

//CLASSES
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

//do not use className to manipulate  because it will overwrite all the existing classes


///Implementing smooth scrolling on the bankist app
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  //first cordinate of te btnscroll to
  //to get this cordinate we can se the .getBoundingClientRect() method
  //example

  const s1Coords = section1.getBoundingClientRect();
  console.log(s1Coords);
  console.log(e.target.getBoundingClientRect()); //this will fetch the coordinates better

  //getting the coord scroll
  console.log(window.pageXOffset, pageYOffset);
  console.log(
    //these w
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////////////////////
//HANDLING CLICK AND TYPE OF EVENTS

const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', () => {
//   alert('You are implementing a mouseenter events: D');
// });
// h1.addEventListener('mouseleave', () => {
//   alert('You have just implement  a mouseleave events: D');
// });

const alertH1 = e => alert('You have just implement  a mouseleave events: D');
h1.addEventListener('mouseleave', alertH1);

//TO REMOVE AN EVENT

setTimeout(() => h1.removeEventListener('mouseleave', alertH1), 3000);

//////////////////////////////////////////////////////////////////////////
//EVENT PROPAGATION IN PRACTICE

const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor(0, 255));
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //the this keyword point to the event handler on which the eventlistener is called
  console.log('LINK', e.target, this);
  //this target is get where the event is originated
  //THE CURRENT TARGET IS ELEMENT ON WHICH THE EVENT HANDLER IS ATTACHED

  //to stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, this);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, this);
  },
  false

  //  false is the third param that enable the capture phase
);

////////////////////////////////////////
/////DOM TRAVERSING: basically means working through the Dom which means that
//we can select an element base on another element.This so important
//because sometimes we need to select an element relative to other element.
// we can select elements downward or up ward and even side ways.
const h1 = document.querySelector('h1');
console.log(h1);

//SELECTING ELEMENT DOWNWARDS:CHILD

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);// select all kind of nodes
console.log(h1.children);// fetch only the direct children
h1.firstElementChild.style.color = 'red';// fetch only the firstchild
h1.lastElementChild.style.color = 'blue';//fetch only the last child

//SELECTING ELEMENT UPWARDS: PARENT
//  console.log(h1.parentNode);
//  console.log(h1.parentElement);
//
//  closet received a query string like the query selector and selectorAll
h1.closest('.header').style.background = 'var(--gradient-secondary)';
//closest can trace a prent element far up no matter how far they are in the dom
we can think of closet as the opposite of querySelector and querySelectorAll

//sideways:selecting siblingz
//in javascript e can only two siblings which are only the prevous and the next ones
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
