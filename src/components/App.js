import '../index.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  useEffect(() => {
    const isAllPopupsClosed = !(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen);
    if (isAllPopupsClosed) return;

    const handleEscClose = event => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isImagePopupOpen]);

  const closeAllPopups = () => {
    setSelectedCard(null);
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);
  };

  const handleClickClosePopup = event => {
    if (event.target.classList.contains('popup__close-icon') || event.target.classList.contains('popup')) {
      closeAllPopups();
    }
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
        />
        <Footer />
      </div>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={handleClickClosePopup}
        children={
          <>
            <input className="form__input" type="text" name="name" minLength="2" maxLength="40" required />
            <span className="form__input-error form__input-error_place_name"></span>
            <input className="form__input" type="text" name="about" minLength="2" maxLength="200" required />
            <span className="form__input-error form__input-error_place_about"></span>
          </>
        }
      />
      <PopupWithForm
        name="add-image"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={handleClickClosePopup}
        buttonText="Создать"
        children={
          <>
            <input className="form__input" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
            <span className="form__input-error form__input-error_place_name"></span>
            <input className="form__input" type="url" placeholder="Ссылка на картинку" name="link" required />
            <span className="form__input-error form__input-error_place_link"></span>
          </>
        }
      />
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={handleClickClosePopup}
        type="popup__form-container_type_edit-avatar"
        children={
          <>
            <input className="form__input" type="url" placeholder="Ссылка на новый аватар" name="avatar" required />
            <span className="form__input-error form__input-error_place_avatar"></span>
          </>
        }
      />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={handleClickClosePopup} />

      <div className="popup popup_type_delete-card">
        <div className="popup__form-container popup__form-container_type_delete-card">
          <form className="form" name="delete-card" noValidate>
            <h2 className="form__title form__title_type_delete-card">Вы уверены?</h2>
            <button className="form__submit-button" type="button">
              Да
            </button>
          </form>
          <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
        </div>
      </div>
    </div>
  );
}

export default App;
