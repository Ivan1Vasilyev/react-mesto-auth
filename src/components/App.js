import '../index.css';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';

const App = () => {
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getDefaultCards()
      .then(setCards)
      .catch(err => console.log(`Ошибка загрузки карточек! ${err}`));
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then(setCurrentUser)
      .catch(err => console.log(`Ошибка загрузки данных пользователя! ${err}`));
  }, []);

  const closeAllPopups = () => {
    setSelectedCard(null);
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);
    setConfirmPopup(false);
  };

  const handleEditAvatarClick = () => setEditAvatarPopup(true);
  const handleEditProfileClick = () => setEditProfilePopup(true);
  const handleAddPlaceClick = () => setAddPlacePopup(true);
  const deleteCardClick = () => setConfirmPopup(true);
  const showFullImageClick = card => {
    setImagePopup(true);
    setSelectedCard(card);
  };
  const handleUpdateUser = userData =>
    api
      .editUserData(userData)
      .then(response => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(err =>
        console.log(`Ошибка обновления данных пользователя! ${err}`)
      );
  const handleAddPlace = placeData =>
    api
      .addCard(placeData)
      .then(response => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка добавления новой карточки! ${err}`));
  const handleUpdateAvatar = newAvatar =>
    api
      .setUserAvatar(newAvatar)
      .then(response => {
        setCurrentUser((currentUser.avatar = response));
        closeAllPopups();
      })
      .catch(err =>
        console.log(`Ошибка обновления аватара пользователя! ${err}`)
      );
  const handleCardLike = card => {
    api
      .toggleLike(card)
      .then(newCard =>
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      )
      .catch(err =>
        console.log(`Ошибка загрузки данных лайка карточки! ${err}`)
      );
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            showFullImageClick={showFullImageClick}
            deleteCardClick={deleteCardClick}
            cards={cards}
            onCardLike={handleCardLike}
          />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          name="full-image"
          type="popup__image-container"
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
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
    </CurrentUserContext.Provider>
  );
};

export default App;
