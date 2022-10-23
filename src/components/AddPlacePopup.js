import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [place, setPlace] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [validationMessage, setValidationMessage] = useState({});
  const [isInputValid, setIsInputValid] = useState({});

  useEffect(() => {
    if (isOpen) {
      setPlace('');
      setUrlImage('');
      setIsInputValid({ link: true, name: true });
      setValidationMessage({ link: '', name: '' });
    }
  }, [isOpen]);

  const inputValidate = e => {
    setIsInputValid({ ...isInputValid, [e.target.name]: e.target.validity.valid });
    setValidationMessage({ ...validationMessage, [e.target.name]: e.target.validationMessage });
  };

  const handlePlaceInputChange = e => setPlace(e.target.value);
  const handleUrlImageInputChange = e => setUrlImage(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    onAddPlace({
      name: place,
      link: urlImage,
    });
  };
  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      type="popup__form-container"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        className={`form__input ${!isInputValid.name && 'form__input_type_error'}`}
        type="text"
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        value={place}
        onChange={handlePlaceInputChange}
        onInput={inputValidate}
        required
      />
      <span className="form__input-error form__input-error_place_name">{validationMessage.name}</span>
      <input
        className={`form__input ${!isInputValid.link && 'form__input_type_error'}`}
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        value={urlImage}
        onChange={handleUrlImageInputChange}
        onInput={inputValidate}
        required
      />
      <span className="form__input-error form__input-error_place_link">{validationMessage.link}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
