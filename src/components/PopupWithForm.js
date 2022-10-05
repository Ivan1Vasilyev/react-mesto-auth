function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={props.onClose}>
      <div className={`popup__form-container ${props.type && props.type}`}>
        <form className="form" name={props.name} noValidate>
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button className="form__submit-button form__submit-button_disabled" type="submit" disabled>
            {props.buttonText || 'Сохранить'}
          </button>
        </form>
        <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
