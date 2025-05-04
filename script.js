'use strict';

document.querySelectorAll('.read-more-btn, #article-btn').forEach((button) => {
  button.addEventListener('click', function () {
    const hiddenText = button.closest('.col-md-7').querySelector('.hidden-text');
    hiddenText.classList.toggle('show');

    let valueToSet = '';
    if (button.innerHTML === 'Read More!' || button.innerHTML === 'Read Less!') {
      valueToSet = button.innerHTML == 'Read More!' ? 'Read Less!' : 'Read More!';
    } else if (button.innerHTML === 'Add Article' || button.innerHTML === 'Hide Form') {
      valueToSet = button.innerHTML == 'Add Article' ? 'Hide Form' : 'Add Article';
    }
    button.innerHTML = valueToSet;
    //Kind of ugly fix, revisit this.
  });
});

function addNewsFormToPage() {
  let newsDiv = document.createElement('div');
  newsDiv.textContent = 'This is new!';
  document.getElementById('article-body').append(newsDiv);
  //Works, save for later
}
function addNewsForm(event) {
  event.preventDefault();

  const form = event.target;
  const titleText = form.newsTitle.value;
  const articleText = form.articleText.value;
  const quoteText = form.quoteText.value;
  const hiddenText = form.articleTextHidden.value;

  const imageFile = form.imageUpload.files[0];

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataUrl = e.target.result;

      console.log('Image as data URL:', imageDataUrl);

      const articleData = {
        title: titleText,
        article: articleText,
        quote: quoteText,
        hidden: hiddenText,
        image: imageDataUrl
      };
      addNewsFormToPage(articleData);
    };
    reader.readAsDataURL(imageFile);
  } else {
    console.log('No image uploaded!');
  }
}

document.getElementById('article-form').addEventListener('submit', addNewsForm);

//AI Newsletter? Tack Martin
//Stupid commercial banner
