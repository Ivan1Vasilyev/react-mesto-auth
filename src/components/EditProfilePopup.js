import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameInputChange = e => setName(e.target.value);
  const handleDescriptionInputChange = e => setDescription(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      type="popup__form-container"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="form__input" type="text" name="name" minLength="2" maxLength="40" value={name} onChange={handleNameInputChange} required />
      <span className="form__input-error form__input-error_place_name"></span>
      <input
        className="form__input"
        type="text"
        name="about"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionInputChange}
        required
      />
      <span className="form__input-error form__input-error_place_about"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
