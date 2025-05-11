'use strict';
loadArticlesFromLocalStorageOnPageLoad();
reAddEventListeners();
removeArticleButtonHandlerFunction();

function reAddEventListeners() {
  document.querySelectorAll('.read-more-btn, #article-btn').forEach((button) => {
    button.removeEventListener('click', addButtonHandler(button));
    button.addEventListener('click', addButtonHandler(button));
  });
}

function removeArticleButtonHandlerFunction() {
  document.querySelectorAll('.remove-article-btn').forEach((button) => {
    button.addEventListener('click', removeButtonHandler(button));
  });
}
function removeButtonHandler(button) {
  return function () {
    const closestTitle = button
      .closest('.row')
      .querySelector('.featurette-heading')
      .innerHTML.trim();

    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    let newArticles = [];
    for (let i in articles) {
      if (articles[i].title.trim() == closestTitle) {
        continue;
      }
      newArticles.push(articles[i]);
    }
    localStorage.removeItem('articles');
    localStorage.setItem('articles', JSON.stringify(newArticles));
    showToast('Article Removed! ✅');
  };
}
function addButtonHandler(button) {
  return function () {
    const hiddenText = button.closest('.col-md-7').querySelector('.hidden-text');
    const truncText = button.closest('.col-md-7').querySelector('.truncated-text');
    const truncTextFull = button.closest('.col-md-7').querySelector('.text-full');

    if (
      button.innerHTML !== 'Add Article' &&
      button.innerHTML !== 'Hide Form' &&
      truncText !== null
    ) {
      truncText.classList.toggle('hidden');
      truncTextFull.classList.toggle('show');
    }
    hiddenText.classList.toggle('show');

    let valueToSet = '';
    if (button.innerHTML === 'Read More!' || button.innerHTML === 'Read Less!') {
      valueToSet = button.innerHTML == 'Read More!' ? 'Read Less!' : 'Read More!';
    } else if (button.innerHTML === 'Add Article' || button.innerHTML === 'Hide Form') {
      valueToSet = button.innerHTML == 'Add Article' ? 'Hide Form' : 'Add Article';
    }
    button.innerHTML = valueToSet;
  };
}

function loadArticlesFromLocalStorageOnPageLoad() {
  const articles = JSON.parse(localStorage.getItem('articles')) || [];
  for (let i in articles) {
    addNewsFormToPage(articles[i]);
    reAddEventListeners();
  }
}

function loadArticlesFromLocalStorage(articleData) {
  const articles = JSON.parse(localStorage.getItem('articles')) || [];
  articles.push(articleData);
  localStorage.setItem('articles', JSON.stringify(articles));
}

function addNewsFormToPage(articleData) {
  document.getElementById('article-body').innerHTML += createArticleHTML(articleData);
  document.getElementsByClassName('sidenav')[0].innerHTML += createSidebarHTML(articleData);

  reAddEventListeners();
}

function createSidebarHTML(articleData) {
  return `
  <a href="#article${document.getElementsByClassName('row featurette').length - 1}">${
    articleData.title.length > 10 ? articleData.title.slice(0, 12) + '...' : articleData.title
  }</a>
  `;
}

function createArticleHTML(articleData) {
  return `
          <hr class="featurette-divider" />
          <div class="row featurette" id="article${
            document.getElementsByClassName('row featurette').length
          }">
            <div class="col-md-7">
              <h2 class="featurette-heading fw-normal lh-1">
              ${articleData.title}              
              </h2>
              <p>${articleData.date}</p>
              <div class="lead">
              <p class="truncated-text">
              ${truncateText(articleData.article)}
              </p>
              <p class="text-full hidden">${articleData.article}</p>
              <div class="hidden-text">
                <p>${articleData.hidden}</p>
                <section class="quote">
                  ${articleData.quote}
                </section>
              </div>
            </div>
            <button class="read-more-btn">Read More!</button>
            <button class="remove-article-btn">Remove Article!</button>
          </div>
            <div class="col-md-5">
              <img class="featurette-image" src="${articleData.image}" />
            </div>
  `;
}
function truncateText(text) {
  return text.length > 60 ? text.slice(0, 60) + '...' : text;
}
function addNewsForm(event) {
  event.preventDefault();

  const form = event.target;
  const titleText = form.newsTitle.value;
  const articleText = form.articleText.value;
  const quoteText = form.quoteText.value;
  const hiddenText = form.articleTextHidden.value;

  const imageFile = form.imageUpload.files[0];
  const dateText = new Date().toDateString();

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataUrl = e.target.result;

      const articleData = {
        title: titleText,
        article: articleText,
        quote: quoteText,
        hidden: hiddenText,
        image: imageDataUrl,
        date: dateText
      };
      addNewsFormToPage(articleData);
      loadArticlesFromLocalStorage(articleData);
      showToast('Article Uploaded ✅');
    };
    reader.readAsDataURL(imageFile);
  } else {
    showToast('Article Upload Failed ❌');
  }
}

function showToast(message) {
  const toastElement = document.getElementById('toast');
  toastElement.querySelector('.toast-body').textContent = message;
  const toast = new bootstrap.Toast(toastElement, { delay: 3000, autohide: true });
  toast.show();
  setTimeout(() => window.location.reload(), 2000);
}

document.getElementById('article-form').addEventListener('submit', addNewsForm);
