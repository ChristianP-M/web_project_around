class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // Método para mostrar el mensaje de error
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // Método para ocultar el mensaje de error
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  // Método para verificar la validez de un input
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Método para verificar si hay inputs inválidos
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Método para alternar el estado del botón submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Método para añadir listeners a cada input
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Método público para habilitar la validación
  enableValidation() {
    this._setEventListeners();
  }
}

// Configuración global de los formularios
const formConfig = {
  inputSelector: ".popup__container-form-input",
  submitButtonSelector: ".popup__container-form-button",
  inactiveButtonClass: "popup__container-form-button_disabled",
  inputErrorClass: "popup__container-form-input_type_error",
  errorClass: "popup__container-form-input-error_active",
};

// Seleccionar y validar todos los formularios
const allForms = document.querySelectorAll(".popup__container");
allForms.forEach((formElement) => {
  const formValidator = new FormValidator(formConfig, formElement);
  formValidator.enableValidation();
});
