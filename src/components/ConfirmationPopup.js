import PopupWithForm from './PopupWithForm';

const ConfirmationPopup = props => (
  <PopupWithForm
    name="confirm"
    title="Вы уверены?"
    type="popup__form-container_type_confirm"
    buttonText="Да"
    titleClassType="form__title_type_confirm"
    {...props}
  />
);

export default ConfirmationPopup;
