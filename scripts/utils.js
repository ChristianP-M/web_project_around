export function closePopupOnOverlayClick(popupElement) {
  popupElement.addEventListener("click", (event) => {
    if (event.target === popupElement) {
      popupElement.classList.remove("popup__opened");
      popupElement.classList.remove("popup-image__opened");
    }
  });
}

export function closePopupOnEscape(event) {
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
