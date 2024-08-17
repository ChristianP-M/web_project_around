import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { closePopupOnOverlayClick, closePopupOnEscape } from "./utils.js";

// *** Constantes y Variables ***

// Popups
const popupEditProfile = document.querySelector("#popup-edit-profile");
const popupPublicImage = document.querySelector("#popup-new-image");
const popupImage = document.querySelector(".popup-image");
const popupImageContent = popupImage.querySelector(
  ".popup-image__contain-image"
);
const popupImageTitle = popupImage.querySelector(".popup-image__title");

// Botones
const buttonEditarPerfil = document.querySelector(".profile__info-edit-diseño");
const buttonAddCard = document.querySelector(".profile__button-add-diseño");
const buttonClosePopUp = popupEditProfile.querySelector(
  ".popup__container-close-window"
);
const buttonClosePopUp2 = popupPublicImage.querySelector(
  ".popup__container-close-window"
);
const popupCloseButton = popupImage.querySelector(".popup-image__close-window");

// Displays
const nameDisplay = document.querySelector(".profile__info-name");
const ocupationDisplay = document.querySelector(".profile__info-ocupation");

// Inputs
const nameInput = popupEditProfile.querySelector("#nombre");
const ocupationInput = popupEditProfile.querySelector("#ocupation");
const titleInput = popupPublicImage.querySelector("#titulo");
const urlInput = popupPublicImage.querySelector("#urlImage");

// Seleccionar los formularios y crear instancias de FormValidator
// const profileForm = document.querySelector("#popup-edit-profile .popup__container");
const addCardForm = document.querySelector(
  "#popup-new-image .popup__container"
);

// Plantilla y Contenedor de Tarjetas
const cardContainer = document.querySelector(".elements__cards");

// Tarjetas Iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// *** Funciones ***

// Manejar el envío del formulario de perfil
function handleProfileFormSubmit(event) {
  event.preventDefault();
  nameDisplay.textContent = nameInput.value;
  ocupationDisplay.textContent = ocupationInput.value;
  popupEditProfile.classList.remove("popup__opened");
}

// Manejar el envío del formulario de nueva tarjeta
function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const newCard = { name: titleInput.value, link: urlInput.value };
  const cardElement = new Card(newCard, "#card").generateCard();
  cardContainer.prepend(cardElement);
  popupPublicImage.classList.remove("popup__opened");
}

// *** Listeners de Eventos ***

// Inicializar tarjetas
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card");
  const cardElement = card.generateCard();
  cardContainer.append(cardElement); // Asegúrate de que `cardContainer` esté bien seleccionado
});

// Abrir popup de editar perfil
buttonEditarPerfil.addEventListener("click", () => {
  nameInput.value = nameDisplay.textContent;
  ocupationInput.value = ocupationDisplay.textContent;
  popupEditProfile.classList.add("popup__opened");

  // Validar los inputs y actualizar el estado del botón
  const profileFormValidator = new FormValidator(
    {
      formSelector: ".popup__container",
      inputSelector: ".popup__container-form-input",
      submitButtonSelector: ".popup__container-form-button",
      inactiveButtonClass: "popup__container-form-button_disabled",
      inputErrorClass: "popup__container-form-input_type_error",
      errorClass: "popup__container-form-input-error_active",
    },
    popupEditProfile
  );
  profileFormValidator.enableValidation();
});

const addCardFormValidator = new FormValidator(
  {
    formSelector: ".popup__container",
    inputSelector: ".popup__container-form-input",
    submitButtonSelector: ".popup__container-form-button",
    inactiveButtonClass: "popup__container-form-button_disabled",
    inputErrorClass: "popup__container-form-input_type_error",
    errorClass: "popup__container-form-input-error_active",
  },
  addCardForm
);

// Restablecer la validación cuando se abra un formulario
// buttonEditarPerfil.addEventListener("click", () => {
//   profileFormValidator.resetValidation();
//   popupEditProfile.classList.add("popup__opened");
// });

buttonAddCard.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  popupPublicImage.classList.add("popup__opened");
});

// Cerrar popup de editar perfil
buttonClosePopUp.addEventListener("click", (event) => {
  event.preventDefault();
  popupEditProfile.classList.remove("popup__opened");
});

// Enviar formulario de editar perfil
popupEditProfile
  .querySelector(".popup__container")
  .addEventListener("submit", handleProfileFormSubmit);

// Abrir popup de nueva tarjeta
buttonAddCard.addEventListener("click", () => {
  popupPublicImage.classList.add("popup__opened");

  // Estado inicial del botón cuando se abre el formulario
  titleInput.value = "";
  urlInput.value = "";

  const cardFormValidator = new FormValidator(
    {
      formSelector: ".popup__container",
      inputSelector: ".popup__container-form-input",
      submitButtonSelector: ".popup__container-form-button",
      inactiveButtonClass: "popup__container-form-button_disabled",
      inputErrorClass: "popup__container-form-input_type_error",
      errorClass: "popup__container-form-input-error_active",
    },
    popupPublicImage
  );
  cardFormValidator.enableValidation();
});

// Cerrar popup de nueva tarjeta
buttonClosePopUp2.addEventListener("click", (event) => {
  event.preventDefault();
  popupPublicImage.classList.remove("popup__opened");
  titleInput.value = "";
  urlInput.value = "";
});

// Enviar formulario de nueva tarjeta
popupPublicImage
  .querySelector(".popup__container")
  .addEventListener("submit", handleAddCardFormSubmit);

closePopupOnOverlayClick(popupEditProfile);
closePopupOnOverlayClick(popupPublicImage);
closePopupOnOverlayClick(popupImage);

document.addEventListener("keydown", closePopupOnEscape);
