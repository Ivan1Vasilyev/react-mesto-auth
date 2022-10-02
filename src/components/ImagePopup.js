function ImagePopup() {
  return (
    <div className="popup popup_type_full-image">
      <div className="popup__image-container">
        <figure className="full-image">
          <img className="full-image__image" src="#" alt="" />
          <figcaption className="full-image__caption"></figcaption>
        </figure>
        <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
      </div>
    </div>
  );
}
