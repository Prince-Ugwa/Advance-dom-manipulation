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
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');// live collection which means that it get updated atomatically
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));live collection which means that it get updated atomatically

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
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });