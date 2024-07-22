const formList = Array.from(document.querySelectorAll(".popup__container"));

// Función para mostrar el error del input
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__container-form-input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__container-form-input-error_active");
};

// Función para ocultar el error del input
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__container-form-input_type_error");
  errorElement.classList.remove("popup__container-form-input-error_active");
  errorElement.textContent = "";
};

// Función para comprobar la validez del input
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Función para habilitar/deshabilitar el botón de envío
const toggleButtonState = (inputList, buttonElement) => {
  const hasInvalidInput = inputList.some(
    (inputElement) =>
      !inputElement.validity.valid || inputElement.value.trim() === ""
  );
  if (hasInvalidInput) {
    buttonElement.classList.add("popup__container-form-button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__container-form-button_disabled");
    buttonElement.disabled = false;
  }
};

// Función para añadir listeners a los inputs de un formulario
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__container-form-input")
  );
  const buttonElement = formElement.querySelector(
    ".popup__container-form-button"
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  // Estado inicial del botón cuando se abre el formulario
  toggleButtonState(inputList, buttonElement);
};

// Función principal para habilitar la validación en todos los formularios
const enableValidation = () => {
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();
