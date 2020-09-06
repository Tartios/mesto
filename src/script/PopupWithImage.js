import {Popup} from './Popup.js'
import {imgSrc, imagePopupTitle} from './parameters.js'
export class PopupWithImage extends Popup {
    open(name, link) {
        imgSrc.src = link;
        imgSrc.alt = name;
        imagePopupTitle.textContent = name;
        super.open();
    }//тут нужно взять те же штуки что в классе карточки лежат (импорты)
    //а последний пункт задания это просто добавить в конструктор карточки 
    //аргумент-функицю и в ней вписывать код который будет прокидывать данные 
    //со строк 29-31 класса карточки подтягивая его отсюда через использование
    //метода open
}