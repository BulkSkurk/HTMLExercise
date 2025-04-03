'use strict';

document.querySelectorAll('.read-more-btn').forEach((button) => {
  button.addEventListener('click', function () {
    const hiddenText = button.closest('.newsarticle').querySelector('.hidden-text');
    hiddenText.classList.toggle('hidden');
  });
});
