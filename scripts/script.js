let popupModalContainer = document.querySelector(".popup");
let buttonOpenPopUp = document.querySelector(".profile__info-edit-diseño");
let buttonClosePopUp = document.querySelector(".popup__container-close-window");

let nameDisplay = document.querySelector(".profile__info-name");
let ocupationDisplay = document.querySelector(".profile__info-ocupation");
let nameInput = document.getElementById("nombre");
let ocupationInput = document.getElementById("ocupation");

let formElement = document.querySelector(".popup__container");

let likeButtons = document.querySelectorAll(".elements__card-head-like");

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

// Informacion de las cartas
const cardContainer = document.querySelector(".elements__cards");
const cardsTemplate = document.querySelector("#card").content;

//Iterar para cada elemento de la carta
initialCards.forEach((cardData) => {
  const cardElement = cardsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".elements__card-image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardTitle = cardElement.querySelector(".elements__card-head-title");
  cardTitle.textContent = cardData.name;

  const likeButton = cardElement.querySelector(".elements__card-head-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("elements__card-head-liked");
  });

  cardContainer.appendChild(cardElement);
});

buttonOpenPopUp.addEventListener("click", function () {
  popupModalContainer.classList.add("popup__opened");
});

buttonClosePopUp.addEventListener("click", function () {
  popupModalContainer.classList.remove("popup__opened");

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

  popupModalContainer.classList.remove("popup__opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
