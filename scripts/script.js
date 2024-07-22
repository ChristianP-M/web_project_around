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

// Plantilla y Contenedor de Tarjetas
const cardContainer = document.querySelector(".elements__cards");
const cardsTemplate = document.querySelector("#card").content;

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

// Crear y añadir tarjeta al contenedor
function createCard(cardData) {
  const cardElement = cardsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__card-image");
  const cardTitle = cardElement.querySelector(".elements__card-head-title");
  const likeButton = cardElement.querySelector(".elements__card-head-like");
  const deleteButton = cardElement.querySelector(".elements__card-trash");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", () => {
    popupImageContent.src = cardData.link;
    popupImageContent.alt = cardData.name;
    popupImageTitle.textContent = cardData.name;
    popupImage.classList.add("popup-image__opened");
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__card-head-liked");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

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
  initialCards.push(newCard);
  const cardElement = createCard(newCard);
  cardContainer.prepend(cardElement);
  titleInput.value = "";
  urlInput.value = "";
  popupPublicImage.classList.remove("popup__opened");
}

// Función para cerrar el popup al hacer clic en el overlay
function closePopupOnOverlayClick(popupElement) {
  popupElement.addEventListener("click", (event) => {
    if (event.target === popupElement) {
      popupElement.classList.remove("popup__opened");
      popupElement.classList.remove("popup-image__opened");
    }
  });
}

// Función para cerrar el popup al presionar la tecla Escape
function closePopupOnEscape(event) {
  if (event.key === "Escape") {
    const openPopups = document.querySelectorAll(
      ".popup__opened, .popup-image__opened"
    );
    openPopups.forEach((popup) => {
      popup.classList.remove("popup__opened");
      popup.classList.remove("popup-image__opened");
    });
  }
}

// *** Listeners de Eventos ***

// Inicializar tarjetas
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardContainer.appendChild(cardElement);
});

// Cerrar popup de imagen
popupCloseButton.addEventListener("click", () => {
  popupImage.classList.remove("popup-image__opened");
});

// Abrir popup de editar perfil
buttonEditarPerfil.addEventListener("click", () => {
  nameInput.value = nameDisplay.textContent;
  ocupationInput.value = ocupationDisplay.textContent;
  popupEditProfile.classList.add("popup__opened");

  // Estado inicial del botón cuando se abre el formulario
  const inputList = Array.from(
    popupEditProfile.querySelectorAll(".popup__container-form-input")
  );
  const buttonElement = popupEditProfile.querySelector(
    ".popup__container-form-button"
  );
  toggleButtonState(inputList, buttonElement);
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
  const inputList = Array.from(
    popupPublicImage.querySelectorAll(".popup__container-form-input")
  );
  const buttonElement = popupPublicImage.querySelector(
    ".popup__container-form-button"
  );
  toggleButtonState(inputList, buttonElement);
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
