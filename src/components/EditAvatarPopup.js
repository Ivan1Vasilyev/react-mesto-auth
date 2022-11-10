import { useState, useEffect, useRef, useCallback } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputRef = useRef();
  const [inputsValidate, setInputsValidate] = useState({ avatar: {} });

  useEffect(() => {
    if (isOpen) inputRef.current.value = '';
  }, [isOpen]);

  const getValidateData = useCallback(validateData => setInputsValidate(validateData), []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onUpdateAvatar({
        avatar: inputRef.current.value,
      });
    },
    [inputRef]
  );
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
      <span className="form__input-error">{inputsValidate.avatar.message}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
