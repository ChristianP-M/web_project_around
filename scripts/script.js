const popups = document.querySelectorAll(".popup");

const primerPopup = popups[0];
const segundoPopup = popups[1];

let buttonEditarPerfil = document.querySelector(".profile__info-edit-diseño");

let buttonClosePopUp = primerPopup.querySelector(
  ".popup__container-close-window"
);

let nameDisplay = document.querySelector(".profile__info-name");
let ocupationDisplay = document.querySelector(".profile__info-ocupation");

let nameInput = primerPopup.querySelector("#nombre");
let ocupationInput = primerPopup.querySelector("#ocupation");

let likeButtons = document.querySelectorAll(".elements__card-head-like");

const buttonAddCard = document.querySelector(".profile__button-add-diseño");

const buttonClosePopUp2 = segundoPopup.querySelector(
  ".popup__container-close-window"
);

const popupImage = document.querySelector(".popup-image");
const popupImageContent = popupImage.querySelector(
  ".popup-image__contain-image"
);
const popupImageTitle = popupImage.querySelector(".popup-image__title");
const popupCloseButton = popupImage.querySelector(".popup-image__close-window");

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

const cardContainer = document.querySelector(".elements__cards");
const cardsTemplate = document.querySelector("#card").content;

initialCards.forEach((cardData) => {
  const cardElement = cardsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".elements__card-image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => {
    popupImageContent.src = cardData.link;
    popupImageContent.alt = cardData.name;
    popupImageTitle.textContent = cardData.name;
    popupImage.classList.add("popup-image__opened");
  });

  const cardTitle = cardElement.querySelector(".elements__card-head-title");
  cardTitle.textContent = cardData.name;

  const likeButton = cardElement.querySelector(".elements__card-head-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("elements__card-head-liked");
  });

  const deleteButton = cardElement.querySelector(".elements__card-trash");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardContainer.appendChild(cardElement);
});

popupCloseButton.addEventListener("click", function () {
  popupImage.classList.remove("popup-image__opened");
});

buttonEditarPerfil.addEventListener("click", function () {
  primerPopup.classList.add("popup__opened");
});

buttonClosePopUp.addEventListener("click", function () {
  primerPopup.classList.remove("popup__opened");

  nameInput.value = nameDisplay.textContent;
  ocupationInput.value = ocupationDisplay.textContent;
});

nameInput.value = nameDisplay.textContent;
ocupationInput.value = ocupationDisplay.textContent;

function handleProfileFormSubmit(evet) {
  evet.preventDefault();

  let nameValue = nameInput.value;
  let ocupationValue = ocupationInput.value;

  nameDisplay.textContent = nameValue;
  ocupationDisplay.textContent = ocupationValue;

  primerPopup.classList.remove("popup__opened");
}

let primerFormElement = primerPopup.querySelector(".popup__container");
primerFormElement.addEventListener("submit", handleProfileFormSubmit);

buttonAddCard.addEventListener("click", function () {
  segundoPopup.classList.add("popup__opened");
});

buttonClosePopUp2.addEventListener("click", function (event) {
  event.preventDefault();

  segundoPopup.classList.remove("popup__opened");

  titleInput.value = "";
  urlInput.value = "";
});

let titleInput = segundoPopup.querySelector("#titulo");
let urlInput = segundoPopup.querySelector("#urlImage");

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const newCard = {
    name: titleInput.value,
    link: urlInput.value,
  };

  initialCards.push(newCard);

  const cardElement = cardsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".elements__card-image");
  cardImage.src = newCard.link;
  cardImage.alt = newCard.name;

  cardImage.addEventListener("click", () => {
    popupImageContent.src = newCard.link;
    popupImageContent.alt = newCard.name;
    popupImageTitle.textContent = newCard.name;
    popupImage.classList.add("popup-image__opened");
  });

  const cardTitle = cardElement.querySelector(".elements__card-head-title");
  cardTitle.textContent = newCard.name;

  const likeButton = cardElement.querySelector(".elements__card-head-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("elements__card-head-liked");
  });

  const deleteButton = cardElement.querySelector(".elements__card-trash");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardContainer.prepend(cardElement);

  titleInput.value = "";
  urlInput.value = "";

  segundoPopup.classList.remove("popup__opened");
}

const segundoFormElement = segundoPopup.querySelector(".popup__container");
segundoFormElement.addEventListener("submit", handleAddCardFormSubmit);
