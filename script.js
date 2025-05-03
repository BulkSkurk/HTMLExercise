'use strict';

document.querySelectorAll('.read-more-btn').forEach((button) => {
  button.addEventListener('click', function () {
    const hiddenText = button.closest('.col-md-7').querySelector('.hidden-text');
    hiddenText.classList.toggle('show');
    var valueToSet = button.innerHTML == 'Read More!' ? 'Read Less!' : 'Read More!';
    button.innerHTML = valueToSet;
  });
});

function addNews() {}
