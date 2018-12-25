'use strict';

(function () {
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = document.querySelector('.setup-fireball-wrap').querySelector('input');
  var wizardCoatInput = document.querySelector('.setup-coat-color');
  var wizardEyesInput = document.querySelector('.setup-eyes-color');

  var colorIndex = 1;
  var changeColor = function (element, elementInput, elementColor) {
    elementInput.value = elementColor[colorIndex];
    colorIndex++;
    if (colorIndex === elementColor.length) {
      colorIndex = 0;
    }
  };

  var nextWizardCoatColor = window.data.wizardCoatColor;
  var nextWizardEyesColor = window.data.wizardEyesColor;
  var nextWizardFireballColor = window.data.wizardFireballColor;

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = nextWizardEyesColor[colorIndex];
    changeColor(wizardEyes, wizardEyesInput, nextWizardEyesColor);
  });
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = nextWizardCoatColor[colorIndex];
    changeColor(wizardCoat, wizardCoatInput, nextWizardCoatColor);
  });
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.background = nextWizardFireballColor[colorIndex];
    changeColor(wizardFireball, wizardFireballInput, nextWizardFireballColor);
  });
})();
