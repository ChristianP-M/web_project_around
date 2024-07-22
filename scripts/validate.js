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

// Función para comprobar si hay un input inválido
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Función para habilitar/deshabilitar el botón de envío
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
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

  toggleButtonState(inputList, buttonElement); // Verificar el estado del botón al inicio

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement); // Verificar el estado del botón al cambiar un input
    });
  });
};

// Función principal para habilitar la validación en todos los formularios
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__container"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement); // Añadir event listeners a cada formulario
  });
};

enableValidation();
