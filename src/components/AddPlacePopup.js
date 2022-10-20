import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [place, setPlace] = useState('');
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPlace('');
      setUrlImage('');
    }
  }, [isOpen]);

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
        className="form__input"
        type="text"
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        value={place}
        onChange={handlePlaceInputChange}
        required
      />
      <span className="form__input-error form__input-error_place_name"></span>
      <input
        className="form__input"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        value={urlImage}
        onChange={handleUrlImageInputChange}
        required
      />
      <span className="form__input-error form__input-error_place_link"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
