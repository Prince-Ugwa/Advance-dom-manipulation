'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

///////////////////////////////////////
//   Selecting, Creating, and Deleting Elements

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

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 70 + 'px';

console.log(getComputedStyle(message).height);
