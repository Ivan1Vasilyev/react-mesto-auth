function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name}`}>
      <div className="popup__form-container popup__form-container_type_edit-avatar">
        <form className="form" name={props.name} novalidate>
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button className={`form__submit-button ${props.buttonType} form__submit-button_disabled`} type="submit" disabled>
            Сохранить
          </button>
        </form>
        <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
      </div>
    </div>
  );
}
