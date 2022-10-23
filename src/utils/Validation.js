class FormValidator {
  constructor(form, settings) {
    this._form = form;
    this._settings = settings;
  }

  _getErrorElement = input => this._form.querySelector(`.form__input-error_place_${input.name}`);

  _showInputError = input => {
    this._getErrorElement(input).textContent = input.validationMessage;
    input.classList.add(this._settings.inputErrorClass);
  };

  _hideInputError = input => {
    this._getErrorElement(input).textContent = '';
    input.classList.remove(this._settings.inputErrorClass);
  };

  _validateInput = input => (input.validity.valid ? this._hideInputError(input) : this._showInputError(input));

  _setButtonValid = () => {
    this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass);
    this._buttonSubmit.removeAttribute('disabled');
  };

  _setButtonInvalid = () => {
    this._buttonSubmit.classList.add(this._settings.inactiveButtonClass);
    this._buttonSubmit.setAttribute('disabled', true);
  };

  _toggleButtonState = () => (this._form.checkValidity() ? this._setButtonValid() : this._setButtonInvalid());

  _setEventListeners = () => {
    this._buttonSubmit = this._form.querySelector(this._settings.submitButtonSelector);
    [...this._form.querySelectorAll(this._settings.inputSelector)].forEach(input => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._toggleButtonState();
      });
    });
  };

  setFormDefault = () => {
    this._setButtonInvalid();
    this._inputsWithError = [...this._form.querySelectorAll(`.${this._settings.inputErrorClass}`)];
    this._inputsWithError.forEach(input => this._hideInputError(input));
  };

  enableValidation = () => this._setEventListeners();
}

const validateSettings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
};

export const formValidator = new FormValidator(document.querySelector('.form'), validateSettings);
