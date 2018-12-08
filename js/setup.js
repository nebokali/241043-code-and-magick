'use strict';

var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var addData = function (place, object) {
  place.push(object);
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
for (var j = 0; j < 4; j++) {
  var nameNumber = randomNumber(0, wizardName.length);
  var surnameNumber = randomNumber(0, wizardSurname.length);
  var coatColorNumber = randomNumber(0, wizardCoatColor.length);
  var eyesColorNumber = randomNumber(0, wizardEyesColor.length);
  var wizardSample = {
    name: wizardName[nameNumber] + ' ' + wizardSurname[surnameNumber],
    coatColor: wizardCoatColor[coatColorNumber],
    eyesColor: wizardEyesColor[eyesColorNumber]
  };
  addData(wizards, wizardSample);
}

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
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
