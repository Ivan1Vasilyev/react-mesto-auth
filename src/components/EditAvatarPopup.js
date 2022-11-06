import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputRef = React.useRef();
  const [inputsValidate, setInputsValidate] = useState({ avatar: {} });

  useEffect(() => {
    if (isOpen) inputRef.current.value = '';
  }, [isOpen]);

  const getValidateData = validateData => setInputsValidate(validateData);

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
      type="popup__form-container_type_edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validate={getValidateData}
    >
      <input
        ref={inputRef}
        className={`form__input ${inputsValidate.avatar.isInvalid && 'form__input_type_error'}`}
        type="url"
        placeholder="Ссылка на новый аватар"
        name="avatar"
        required
      />
      <span className="form__input-error form__input-error_place_avatar">{inputsValidate.avatar.message}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
