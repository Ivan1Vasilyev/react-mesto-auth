import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inputsValidate, setInputsValidate] = useState({ name: {}, about: {} });

  const handleNameInputChange = e => setName(e.target.value);
  const handleDescriptionInputChange = e => setDescription(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  const getValidateData = validateData => setInputsValidate(validateData);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      type="popup__form-container"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validate={getValidateData}
    >
      <input
        className={`form__input ${inputsValidate.name.isInvalid && 'form__input_type_error'}`}
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameInputChange}
        required
      />
      <span className="form__input-error form__input-error_place_name">{inputsValidate.name.message}</span>
      <input
        className={`form__input ${inputsValidate.about.isInvalid && 'form__input_type_error'}`}
        type="text"
        name="about"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionInputChange}
        required
      />
      <span className="form__input-error form__input-error_place_about">{inputsValidate.about.message}</span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
