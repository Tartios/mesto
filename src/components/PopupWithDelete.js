import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
    constructor( popupSelector, handleDelete ) {
        super(popupSelector);
        this.handleDeleteClick = handleDelete;
    }

    // handleDeleteClick(submitAction) {
    //     this._handle = submitAction;
    // }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__save-button').addEventListener("click", (evt) => {
            evt.preventDefault();
            console.log('hi')
            this.handleDeleteClick();
            this.close();
            //это короче попап выскакивающий при нажатии урны
            //тут нужно придумать как после нажатия будет удаляться карточка, чет пока хз вообще
        })
    }
}