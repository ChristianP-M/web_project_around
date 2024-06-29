//Se guardan en una variable para reutilizar los popups distintos que tengo
const popups = document.querySelectorAll(".popup");

//Seleccionamos el popup que vamos a utilizar, 1 es para editar perfil
//2 es para agregar imagenes al initialCards.
const primerPopup = popups[0];
const segundoPopup = popups[1];

//Obtiene la ubicacion del boton
let buttonEditarPerfil = document.querySelector(".profile__info-edit-diseño");
//Este es para cerrar el primer formulario
let buttonClosePopUp = primerPopup.querySelector(
  ".popup__container-close-window"
);

//Obtiene la informacion de la pagina para editar el nombre y la ocupacion
let nameDisplay = document.querySelector(".profile__info-name");
let ocupationDisplay = document.querySelector(".profile__info-ocupation");

//obtiene los valores intoducidos del primer formulario
let nameInput = primerPopup.querySelector("#nombre");
let ocupationInput = primerPopup.querySelector("#ocupation");

//Este es la variable para todos los me gusta de las tarjetas
let likeButtons = document.querySelectorAll(".elements__card-head-like");

////////////////Ahora vamos con el segundo formulario///////
//Obtenemos la ubicacion del botón.
const buttonAddCard = document.querySelector(".profile__button-add-diseño");
//Este es para cerrar el segundo formulario
const buttonClosePopUp2 = segundoPopup.querySelector(
  ".popup__container-close-window"
);

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

  const deleteButton = cardElement.querySelector(".elements__card-trash");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardContainer.appendChild(cardElement);
});

//Esto es para abrir la edicion del perfil
buttonEditarPerfil.addEventListener("click", function () {
  primerPopup.classList.add("popup__opened");
});

//Esto es para cerrar el primerFormulario, sin guardar cambios
buttonClosePopUp.addEventListener("click", function () {
  primerPopup.classList.remove("popup__opened");

  // Restaura los valores originales en los campos de entrada
  nameInput.value = nameDisplay.textContent;
  ocupationInput.value = ocupationDisplay.textContent;
});

// Establece los valores iniciales en los campos de entrada
nameInput.value = nameDisplay.textContent;
ocupationInput.value = ocupationDisplay.textContent;

// Maneja el envío del formulario de perfil
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

//////ESto es para el segundo formulario
buttonAddCard.addEventListener("click", function () {
  segundoPopup.classList.add("popup__opened");
});

buttonClosePopUp2.addEventListener("click", function () {
  segundoPopup.classList.remove("popup__opened");
});

//obtiene los valores intoducidos del segundo formulario
let titleInput = segundoPopup.querySelector("#titulo");
let urlInput = segundoPopup.querySelector("#urlImage");

// Maneja el envío del formulario de agregar imagen
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

  const cardTitle = cardElement.querySelector(".elements__card-head-title");
  cardTitle.textContent = newCard.name;

  const likeButton = cardElement.querySelector(".elements__card-head-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("elements__card-head-liked");
  });

  cardContainer.prepend(cardElement);

  titleInput.value = "";
  urlInput.value = "";

  segundoPopup.classList.remove("popup__opened");
}

const segundoFormElement = segundoPopup.querySelector(".popup__container");
segundoFormElement.addEventListener("submit", handleAddCardFormSubmit);
