import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';

function App() {
  const [popup, setPopup] = React.useState({
    isEditAvatarPopupOpen: false,
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
  });

  React.useEffect(() => {});

  const handleEditAvatarClick = () => {
    document.querySelector('.popup_type_edit-avatar').classList.add('popup_opened');
  };

  const handleEditProfileClick = () => {
    document.querySelector('.popup_type_profile').classList.add('popup_opened');
  };

  const handleAddPlaceClick = () => {
    document.querySelector('.popup_type_add-image').classList.add('popup_opened');
  };

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
      </div>
      <div className="popup popup_type_profile">
        <div className="popup__form-container">
          <form className="form" name="profile" noValidate>
            <h2 className="form__title">Редактировать профиль</h2>
            <input className="form__input" type="text" name="name" minLength="2" maxLength="40" required />
            <span className="form__input-error form__input-error_place_name"></span>
            <input className="form__input" type="text" name="about" minLength="2" maxLength="200" required />
            <span className="form__input-error form__input-error_place_about"></span>
            <button className="form__submit-button form__submit-button_disabled" type="submit" disabled>
              Сохранить
            </button>
          </form>
          <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
        </div>
      </div>
      <div className="popup popup_type_add-image">
        <div className="popup__form-container">
          <form className="form" name="add-image" noValidate>
            <h2 className="form__title">Новое место</h2>
            <input className="form__input" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
            <span className="form__input-error form__input-error_place_name"></span>
            <input className="form__input" type="url" placeholder="Ссылка на картинку" name="link" required />
            <span className="form__input-error form__input-error_place_link"></span>
            <button className="form__submit-button form__submit-button_disabled" type="submit" disabled>
              Создать
            </button>
          </form>
          <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
        </div>
      </div>
      <div className="popup popup_type_full-image">
        <div className="popup__image-container">
          <figure className="full-image">
            <img className="full-image__image" src="#" alt="" />
            <figcaption className="full-image__caption"></figcaption>
          </figure>
          <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
        </div>
      </div>
      <div className="popup popup_type_edit-avatar">
        <div className="popup__form-container popup__form-container_type_edit-avatar">
          <form className="form" name="edit-avatar" noValidate>
            <h2 className="form__title">Обновить аватар</h2>
            <input className="form__input" type="url" placeholder="Ссылка на новый аватар" name="avatar" required />
            <span className="form__input-error form__input-error_place_avatar"></span>
            <button className="form__submit-button form__submit-button_type_edit-avatar form__submit-button_disabled" type="submit" disabled>
              Сохранить
            </button>
          </form>
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
