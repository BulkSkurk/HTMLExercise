'use strict';

var currentTime = new Date().toISOString().slice(0, 10);

document.querySelector('#todays-date').textContent = `Current Date: ${currentTime}`;

document.querySelectorAll('.read-more-btn').forEach((button) => {
  button.addEventListener('click', function () {
    const hiddenText = button.closest('.newsarticle').querySelector('.hidden-text');
    hiddenText.classList.toggle('hidden');
  });
});
