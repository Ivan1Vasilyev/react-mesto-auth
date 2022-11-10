import Popup from './Popup';
import acceptImage from '../images/accepted.svg';
import errorImage from '../images/error.svg';

const InfoTooltip = ({ onClose, isOpen, onError, errorMessage }) => {
  return (
    <Popup onClose={onClose} type="popup__form-container popup__form-container_type_infotooltip" isOpen={isOpen}>
      <img className="popup__info-image" src={onError ? errorImage : acceptImage} alt="Картинка о результате регистарции" />
      <p className="popup__info-message">
        {onError ? `Что-то пошло не так! ${errorMessage.error || errorMessage.message}` : 'Вы успешно зарегистрировались!'}
      </p>
    </Popup>
  );
};

export default InfoTooltip;
