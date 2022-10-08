import Popup from './Popup';

const PopupWithForm = props => (
  <Popup name={props.name} onClose={props.onClose} type={props.type} isOpen={props.isOpen}>
    <form className="form" name={props.name} noValidate>
      <h2 className={`form__title ${props.titleClassType && props.titleClassType}`}>{props.title}</h2>
      {props.children}
      <button className={`form__submit-button ${props.enabled ?? 'form__submit-button_disabled'}`} type="submit" disabled>
        {props.buttonText || 'Сохранить'}
      </button>
    </form>
  </Popup>
);

export default PopupWithForm;
