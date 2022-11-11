import PopupWithForm from './PopupWithForm';

const ConfirmationPopup = ({ isOpen, onClose, onConfirm }) => (
  <PopupWithForm
    name="delete-card"
    title="Вы уверены?"
    type="popup__form-container_type_confirm"
    buttonText="Да"
    titleClassType="form__title_type_confirm"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={onConfirm}
  />
);
export default ConfirmationPopup;
