import Popup from './Popup';

const ImagePopup = ({ card, isOpen, onClose }) => (
  <Popup name="full-image" type="popup__image-container" onClose={onClose} isOpen={isOpen}>
    <figure className="full-image">
      <img className="full-image__image" src={card && card.link} alt={card && card.name} />
      <figcaption className="full-image__caption">{card && card.name}</figcaption>
    </figure>
  </Popup>
);

export default ImagePopup;
