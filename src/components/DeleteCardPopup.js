import { useCallback } from 'react';
import PopupWithForm from './PopupWithForm';

const DeleteCardPopup = ({ isOpen, onClose, onDeleteCard }) => {
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onDeleteCard();
    },
    [onDeleteCard]
  );
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      type="popup__form-container_type_delete-card"
      buttonText="Да"
      titleClassType="form__title_type_delete-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonEnabled={true}
    />
  );
};

export default DeleteCardPopup;
