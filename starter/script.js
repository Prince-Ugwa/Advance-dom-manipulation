'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
///Implementing smooth scrolling on the bankist app

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

//in event delegation we add event to aparent of all the element that we interested in
// add lister commn parent element
//determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  const id = e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//////////////////////////////////////////////
//LECTURE PARTS
///////////////////////////////////////
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
*/
