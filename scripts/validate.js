// Función para mostrar el error del input
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Función para ocultar el error del input
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

// Función para comprobar la validez del input
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Función para habilitar/deshabilitar el botón de envío
const toggleButtonState = (inputList, buttonElement, config) => {
  const hasInvalidInput = inputList.some(
    (inputElement) =>
      !inputElement.validity.valid || inputElement.value.trim() === ""
  );
  if (hasInvalidInput) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Función para añadir listeners a los inputs de un formulario
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });

  toggleButtonState(inputList, buttonElement, config);
};

// Función principal para habilitar la validación en todos los formularios
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

// Habilitar la validación llamando a enableValidation() y pasando todas las configuraciones en la llamada
enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__container-form-input",
  submitButtonSelector: ".popup__container-form-button",
  inactiveButtonClass: "popup__container-form-button_disabled",
  inputErrorClass: "popup__container-form-input_type_error",
  errorClass: "popup__container-form-input-error_active",
});
