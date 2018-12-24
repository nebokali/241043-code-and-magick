'use strict';
(function () {
  var buttonSetupOpen = document.querySelector('.setup-open');
  var buttonSetupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');

  var popupOriginPosition = {
    x: window.data.userDialog.offsetLeft,
    y: window.data.userDialog.offsetTop
  };

  var openPopup = function () {
    window.data.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', closePopupByEsc);
    popupOriginPosition.x = window.data.userDialog.offsetLeft;
    popupOriginPosition.y = window.data.userDialog.offsetTop;
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
    window.data.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', closePopupByEsc);
    window.data.userDialog.style.top = popupOriginPosition.y + 'px';
    window.data.userDialog.style.left = popupOriginPosition.x + 'px';
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

  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (preventEvt) {
          preventEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
