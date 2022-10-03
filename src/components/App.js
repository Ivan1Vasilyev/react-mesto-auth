import '../index.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);

  useEffect(() => {
    const callback = isEditAvatarPopupOpen
      ? setEditAvatarPopup
      : isEditProfilePopupOpen
      ? setEditProfilePopup
      : isAddPlacePopupOpen
      ? setAddPlacePopup
      : null;

    if (callback === null) return;

    const handleEscClose = event => {
      if (event.key === 'Escape') {
        closePopup(callback);
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return function removeListener() {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen]);

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  };

  const closePopup = setter => {
    setter(false);
  };

  const closeAllPopups = (event, setter) => {
    if (event.target.classList.contains('popup__close-icon') || event.target.classList.contains('popup')) {
      closePopup(setter);
    }
  };

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
      </div>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={event => closeAllPopups(event, setEditProfilePopup)}
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
        onClose={event => closeAllPopups(event, setAddPlacePopup)}
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
        onClose={event => closeAllPopups(event, setEditAvatarPopup)}
        type="popup__form-container_type_edit-avatar"
        children={
          <>
            <input className="form__input" type="url" placeholder="Ссылка на новый аватар" name="avatar" required />
            <span className="form__input-error form__input-error_place_avatar"></span>
          </>
        }
      />
      <div className="popup popup_type_full-image">
        <div className="popup__image-container">
          <figure className="full-image">
            <img className="full-image__image" src="#" alt="" />
            <figcaption className="full-image__caption"></figcaption>
          </figure>
          <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
        </div>
      </div>
      <div className="popup popup_type_delete-card">
        <div className="popup__form-container popup__form-container_type_delete-card">
          <form className="form" name="delete-card" noValidate>
            <h2 className="form__title form__title_type_delete-card">Вы уверены?</h2>
            <button className="form__submit-button form__submit-button_type_delete-card" type="button">
              Да
            </button>
          </form>
          <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
        </div>
      </div>
      <template id="card-template">
        <li className="card">
          <img className="card__image" src="#" alt="" />
          <h2 className="card__caption"></h2>
          <div className="card__like-container">
            <button className="card__like" type="button" aria-label="Лайк"></button>
            <p className="card__likes-counter"></p>
          </div>
          <button className="card__delete" type="button" aria-label="Удалить карточку"></button>
        </li>
      </template>
    </div>
  );
}

export default App;
