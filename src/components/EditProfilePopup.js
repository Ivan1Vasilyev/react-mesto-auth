import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validationMessage, setValidationMessage] = useState({});
  const [isInputValid, setIsInputValid] = useState({});

  const handleNameInputChange = e => setName(e.target.value);
  const handleDescriptionInputChange = e => setDescription(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  const inputValidate = e => {
    setIsInputValid({ ...isInputValid, [e.target.name]: e.target.validity.valid });
    setValidationMessage({ ...validationMessage, [e.target.name]: e.target.validationMessage });
  };

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setIsInputValid({ about: true, name: true });
      setValidationMessage({ about: '', name: '' });
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
    >
      <input
        className={`form__input ${!isInputValid.name && 'form__input_type_error'}`}
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameInputChange}
        onInput={inputValidate}
        required
      />
      <span className="form__input-error form__input-error_place_name">{validationMessage.name}</span>
      <input
        className={`form__input ${!isInputValid.about && 'form__input_type_error'}`}
        type="text"
        name="about"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionInputChange}
        onInput={inputValidate}
        required
      />
      <span className="form__input-error form__input-error_place_about">{validationMessage.about}</span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
