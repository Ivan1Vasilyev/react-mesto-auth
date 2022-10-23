import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputRef = React.useRef();
  const [validationMessage, setValidationMessage] = useState({});
  const [isInputValid, setIsInputValid] = useState({});

  useEffect(() => {
    if (isOpen) inputRef.current.value = '';
    setValidationMessage({ avatar: '' });
    setIsInputValid({ avatar: true });
  }, [isOpen]);

  const inputValidate = e => {
    setIsInputValid({ ...isInputValid, [e.target.name]: e.target.validity.valid });
    setValidationMessage({ ...validationMessage, [e.target.name]: e.target.validationMessage });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  };
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      type="popup__form-container popup__form-container_type_edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input ref={inputRef} className="form__input" type="url" placeholder="Ссылка на новый аватар" name="avatar" onInput={inputValidate} required />
      <span className="form__input-error form__input-error_place_avatar">{validationMessage.avatar}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
