import { gridCards, popups } from "./parameters.js";

//возвращает значение открытой модалки
export const isPopupOpened = (popup) => {
  return popup.classList.contains("popup_open");
};
//проверяет, открыта ли какая-нибудь модалка
export const thisModalIsOpen = () => {
  const popupElement = popups.find(function (popup) {
    return isPopupOpened(popup);
  });
  return popupElement;
};
// //закрывает модалку нажатием на esc
// export const handleEscape = (e) => {
//     const popupElement = thisModalIsOpen();
//     if(e.key === 'Escape') {
//         if(popupElement != undefined) {
//             closePopup(popupElement);
//         }
//     }
// };

// export function removeValidate() {
//   popupError.forEach((item) => {
//     item.textContent = "";
//   });
// }

// export function openPopup(modal) {// открыть модалку
//     removeValidate();
//     escEvLAdd();
//     modal.classList.add('popup_open');
// };

// export function closePopup(modal) {// закрыть модалку
//     escEvLRemove();
//     modal.classList.remove('popup_open');
// };

// export const escEvLAdd = () => {//добавить слушатель esc
//     document.addEventListener('keydown', handleEscape);
// };

// export const escEvLRemove = () => {//удалить слушатель esc
//     document.removeEventListener('keydown', handleEscape);
// };

export const cardCreator = (element) => {
  //добавляет карточку на страницу
  gridCards.prepend(element);
};

// export function blockButton(buttonElement, inactiveButtonClass) {
//   buttonElement.classList.add(inactiveButtonClass);
//   buttonElement.disabled = true;
// }
