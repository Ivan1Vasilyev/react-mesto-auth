import Popup from './Popup';
import acceptImage from '../images/accepted.svg';
import errorImage from '../images/error.svg';

const InfoTooltip = ({ onClose, isOpen, errorMessage }) => {
  return (
    <Popup onClose={onClose} type="popup__form-container popup__form-container_type_infotooltip" isOpen={isOpen}>
      <img className="popup__info-image" src={errorMessage ? errorImage : acceptImage} alt="Картинка о результате регистарции" />
      <p className="popup__info-message">{errorMessage ? `Что-то пошло не так! ${errorMessage}` : 'Вы успешно зарегистрировались!'}</p>
    </Popup>
  );
};

export default InfoTooltip;
