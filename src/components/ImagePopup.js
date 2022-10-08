import Popup from './Popup';

const ImagePopup = props => (
  <Popup name={props.name} type={props.type} onClose={props.onClose} isOpen={props.isOpen}>
    <figure className="full-image">
      <img className="full-image__image" src={props.card && props.card.link} alt={props.card && props.card.name} />
      <figcaption className="full-image__caption">{props.card && props.card.name}</figcaption>
    </figure>
  </Popup>
);

export default ImagePopup;
