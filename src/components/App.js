import '../index.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

const App = () => {
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const closeAllPopups = () => {
    setSelectedCard(null);
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);
    setConfirmPopup(false);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  };

  const handleBasketClick = () => {
    setConfirmPopup(true);
  };

  const handleCardClick = card => {
    setImagePopup(true);
    setSelectedCard(card);
  };

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onBasketClick={handleBasketClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        type="popup__form-container"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input className="form__input" type="text" name="name" minLength="2" maxLength="40" required />
        <span className="form__input-error form__input-error_place_name"></span>
        <input className="form__input" type="text" name="about" minLength="2" maxLength="200" required />
        <span className="form__input-error form__input-error_place_about"></span>
      </PopupWithForm>
      <PopupWithForm
        name="add-image"
        title="Новое место"
        type="popup__form-container"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Создать"
      >
        <input className="form__input" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
        <span className="form__input-error form__input-error_place_name"></span>
        <input className="form__input" type="url" placeholder="Ссылка на картинку" name="link" required />
        <span className="form__input-error form__input-error_place_link"></span>
      </PopupWithForm>
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        type="popup__form-container popup__form-container_type_edit-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input className="form__input" type="url" placeholder="Ссылка на новый аватар" name="avatar" required />
        <span className="form__input-error form__input-error_place_avatar"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} name="full-image" type="popup__image-container" />

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        type="popup__form-container popup__form-container_type_delete-card"
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        buttonText="Да"
        titleClassType="form__title_type_delete-card"
        enabled={true}
      />
    </div>
  );
};

export default App;
