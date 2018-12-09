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

var userDialog = document.querySelector('.setup');
var fragment = document.createDocumentFragment();
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = [];

var createWizard = function (nameOrigin, surnameOrigin, coatOrigin, eyesOrigin) {
  this.name = nameOrigin[randomNumber(0, nameOrigin.length)] + ' ' + surnameOrigin[randomNumber(0, surnameOrigin.length)],
  this.coatColor = coatOrigin[randomNumber(0, coatOrigin.length)],
  this.eyesColor = eyesOrigin[randomNumber(0, eyesOrigin.length)]
};

var addWizard = function () {
  for (var j = 0; j < 4; j++) {
    var wizardSample = new createWizard (wizardName, wizardSurname, wizardCoatColor,wizardEyesColor);
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

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
