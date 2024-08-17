export default class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
  }

  // Método privado para obtener el template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  // Método privado para configurar los listeners
  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }

  // Método privado para manejar la acción de "like"
  _handleLikeIcon() {
    this._likeButton.classList.toggle("elements__card-head-liked");
  }

  // Método privado para eliminar la tarjeta
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Método privado para abrir la imagen en un popup
  _handleImageClick() {
    const popupImage = document.querySelector(".popup-image");
    const popupImageContent = popupImage.querySelector(
      ".popup-image__contain-image"
    );
    const popupImageTitle = popupImage.querySelector(".popup-image__title");

    popupImageContent.src = this._link;
    popupImageContent.alt = this._name;
    popupImageTitle.textContent = this._name;

    popupImage.classList.add("popup-image__opened");
  }

  // Método público para crear la tarjeta
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".elements__card-image");
    this._cardTitle = this._element.querySelector(".elements__card-head-title");
    this._likeButton = this._element.querySelector(".elements__card-head-like");
    this._deleteButton = this._element.querySelector(".elements__card-trash");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
