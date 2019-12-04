'use strict';

// CAMBIAR COLOR BOTÓN SHARE

//Función para cambiar de color el botón de share
const shareButton = document.querySelector('.js-share-button');
const form = document.querySelector('.js-form');
function checkForm() {
  if (form.checkValidity() === true) {
    shareButton.classList.remove('js-button--filter');
    shareButton.removeAttribute('disabled');
  } else {
    shareButton.classList.add('js-button--filter');
    shareButton.setAttribute('disabled', true);
    twitterContainer.classList.add('js-share--url');
  }
}
//esta función la estamos llamando desde la DoAll, que está en el fill

//URL Y TWITTER

//constantes
const shareButtonOk = document.querySelector('.js-share-button');
const twitterContainer = document.querySelector('.js-share--url');

function sendRequest(getDataObj) {
  console.log('entroooo');
  fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card', {
    method: 'POST',
    body: JSON.stringify(getDataObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(result) {
      showURL(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}

const responseURL = document.querySelector('.js-notification-link');

function showURL(result) {
  if (result.success) {
    responseURL.innerHTML =
      '<a href=' + result.cardURL + '>' + result.cardURL + '</a>';
  } else {
    responseURL.innerHTML = 'ERROR:' + result.error;
  }
}

//función handler
function showTwitter() {
  if (form.checkValidity() === true) {
    twitterContainer.classList.remove('js-share--url');
  } else {
    twitterContainer.classList.add('js-share--url');
  }
  sendRequest();
}

//función listener
shareButtonOk.addEventListener('click', showTwitter);
