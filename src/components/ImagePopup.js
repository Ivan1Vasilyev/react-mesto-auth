function ImagePopup(props) {
  return (
    <div className={`popup popup_type_full-image ${props.isOpen && 'popup_opened'}`} onClick={props.onClose}>
      <div className="popup__image-container">
        <figure className="full-image">
          <img className="full-image__image" src={props.card && props.card.link} alt={props.card && props.card.name} />
          <figcaption className="full-image__caption">{props.card && props.card.name}</figcaption>
        </figure>
        <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
      </div>
    </div>
  );
}

export default ImagePopup;
