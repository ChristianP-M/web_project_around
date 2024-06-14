let popupModalContainer = document.querySelector(".popup");
let buttonOpenPopUp = document.querySelector(".profile__info-edit-diseño");
let buttonClosePopUp = document.querySelector(".popup__container-close-window");

let nameDisplay = document.querySelector(".profile__info-name");
let ocupationDisplay = document.querySelector(".profile__info-ocupation");
let nameInput = document.getElementById("nombre");
let ocupationInput = document.getElementById("ocupation");

let formElement = document.querySelector(".popup__container");

let likeButtons = document.querySelectorAll(".elements__card-head-like");

likeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    button.classList.toggle("elements__card-head-liked");
  });
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
