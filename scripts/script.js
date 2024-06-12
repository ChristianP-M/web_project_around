let popupModalContainer = document.querySelector(".popup");
let buttonOpenPopUp = document.querySelector(".profile__info-edit-diseño");
let buttonClosePopUp = document.querySelector(".popup__container-close-window");

buttonOpenPopUp.addEventListener("click", function () {
  popupModalContainer.classList.add("popup__opened");
});

buttonClosePopUp.addEventListener("click", function () {
  popupModalContainer.classList.remove("popup__opened");
});
