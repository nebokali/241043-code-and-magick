'use strict';

var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var wizardName = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var wizardSurname = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var wizardCoatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var wizardEyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var wizardFireballColor = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var userDialog = document.querySelector('.setup');
var fragment = document.createDocumentFragment();
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var buttonSetupOpen = document.querySelector('.setup-open');
var buttonSetupClose = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardFireballInput = document.querySelector('.setup-fireball-wrap').querySelector('input');
var wizardCoatInput = document.querySelector('.setup-coat-color');
var wizardEyesInput = document.querySelector('.setup-eyes-color');
var ESC_KEY = 27;
var ENT_KEY = 13;

var wizards = [];

var CreateWizard = function (nameOrigin, surnameOrigin, coatOrigin, eyesOrigin) {
  this.name = nameOrigin[randomNumber(0, nameOrigin.length)] + ' ' + surnameOrigin[randomNumber(0, surnameOrigin.length)];
  this.coatColor = coatOrigin[randomNumber(0, coatOrigin.length)];
  this.eyesColor = eyesOrigin[randomNumber(0, eyesOrigin.length)];
};

var addWizard = function () {
  for (var j = 0; j < 4; j++) {
    var wizardSample = new CreateWizard(wizardName, wizardSurname, wizardCoatColor, wizardEyesColor);
    wizards.push(wizardSample);
  }
};
addWizard();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

var showSimilarWizards = function () {
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};
showSimilarWizards();

var popupOriginPosition = {
  x: userDialog.offsetLeft,
  y: userDialog.offsetTop
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', closePopupByEsc);
  popupOriginPosition.x = userDialog.offsetLeft;
  popupOriginPosition.y = userDialog.offsetTop;
};

buttonSetupOpen.addEventListener('click', function () {
  openPopup();
});

buttonSetupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENT_KEY) {
    openPopup();
  }
});

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', closePopupByEsc);
  userDialog.style.top = popupOriginPosition.y + 'px';
  userDialog.style.left = popupOriginPosition.x + 'px';
};

var closePopupByEsc = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    closePopup();
  }
};

buttonSetupClose.addEventListener('click', function () {
  closePopup();
});

buttonSetupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENT_KEY) {
    closePopup();
  }
});

setupUserName.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    evt.stopPropagation();
  }
});

var validateUserName = function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя персонажа не может содержать менее 2 символов.');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Максимальная длина имени персонажа — 25 символов.');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Необходимо ввести имя персонажа.');
  } else {
    setupUserName.setCustomValidity('Имя изменено.');
  }
};

var checkUserName = function () {
  setupUserName.checkValidity();
};

setupUserName.addEventListener('input', function () {
  checkUserName();
});

setupUserName.addEventListener('invalid', function () {
  validateUserName();
});

var colorIndex = 1;
var changeColor = function (element, elementInput, elementColor) {
  elementInput.value = elementColor[colorIndex];
  colorIndex++;
  if (colorIndex === elementColor.length) {
    colorIndex = 0;
  }
};

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = wizardEyesColor[colorIndex];
  changeColor(wizardEyes, wizardEyesInput, wizardEyesColor);
});
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = wizardCoatColor[colorIndex];
  changeColor(wizardCoat, wizardCoatInput, wizardCoatColor);
});
wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = wizardFireballColor[colorIndex];
  changeColor(wizardFireball, wizardFireballInput, wizardFireballColor);
});
