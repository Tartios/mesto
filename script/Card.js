import {popupImage, imgSrc, imagePopupTitle} from './parameters.js'
import {openPopup} from './utils.js'


export default class Card {
    constructor(item) {
        this._link = item.link;
        this._name = item.name;
    }
    _getCard() {
        const cardTemplate = document
        .querySelector('#card')
        .content
        .querySelector('.foto-grid__section')
        .cloneNode(true);

        return cardTemplate;
    }

    _handleDeleteCard() {
        this._element.closest('.foto-grid__section').remove();
    }

    _handleLikeCard() {
        this._element.querySelector('.foto-grid__like-button').classList.toggle('foto-grid__like-button_true');
    }

    _handleOpenImg() {
        imgSrc.src = this._link;
        imgSrc.alt = this._name;
        imagePopupTitle.textContent = this._name;
        openPopup(popupImage);
    }

    _addEventListeners() {
        this._element.querySelector('.foto-grid__delete-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._element.querySelector('.foto-grid__image').addEventListener('click', () => {
            this._handleOpenImg();
        });
        this._element.querySelector('.foto-grid__like-button').addEventListener('click', () => {
            this._handleLikeCard();
        });
    }

    createCard() {
        this._element = this._getCard();
        this._addEventListeners();

        this._element.querySelector('.foto-grid__image').src = this._link;
        this._element.querySelector('.foto-grid__title').textContent = this._name;

        return this._element;
    }
}