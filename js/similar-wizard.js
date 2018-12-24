'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var similarListElement = window.data.userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var wizards = [];

  var CreateWizard = function (nameOrigin, surnameOrigin, coatOrigin, eyesOrigin) {
    this.name = nameOrigin[randomNumber(0, nameOrigin.length)] + ' ' + surnameOrigin[randomNumber(0, surnameOrigin.length)];
    this.coatColor = coatOrigin[randomNumber(0, coatOrigin.length)];
    this.eyesColor = eyesOrigin[randomNumber(0, eyesOrigin.length)];
  };

  var newWizardName = window.data.wizardName;
  var newWizardSurname = window.data.wizardSurname;
  var newWizardCoatColor = window.data.wizardCoatColor;
  var newWizardEyesColor = window.data.wizardEyesColor;

  var addWizard = function () {
    for (var j = 0; j < 4; j++) {
      var wizardSample = new CreateWizard(newWizardName, newWizardSurname, newWizardCoatColor, newWizardEyesColor);
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
    window.data.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };
  showSimilarWizards();
})();
