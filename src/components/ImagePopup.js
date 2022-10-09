import Popup from './Popup';

const ImagePopup = ({ card, ...props }) => (
  <Popup name={props.name} type={props.type} onClose={props.onClose} isOpen={props.isOpen}>
    <figure className="full-image">
      <img className="full-image__image" src={card && card.link} alt={card && card.name} />
      <figcaption className="full-image__caption">{card && card.name}</figcaption>
    </figure>
  </Popup>
);

export default ImagePopup;
