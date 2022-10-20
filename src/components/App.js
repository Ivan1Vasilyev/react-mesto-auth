import '../index.css';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';

const App = () => {
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .loadDefaultData()
      .then(([userInfo, defaultCards]) => {
        setCurrentUser(userInfo);
        setCards([...defaultCards]);
      })
      .catch(err => console.log(`Ошибка загрузки начальных данных! ${err}`));
  }, []);

  const closeAllPopups = () => {
    setSelectedCard(null);
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);
    setDeleteCardPopup(false);
  };

  const openEditAvatarPopup = () => setEditAvatarPopup(true);
  const openEditProfilePopup = () => setEditProfilePopup(true);
  const openAddPlacePopup = () => setAddPlacePopup(true);
  const openDeleteCardPopup = card => {
    setDeleteCardPopup(true);
    setSelectedCard(card);
  };

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
      .catch(err => console.log(`Ошибка обновления данных пользователя! ${err}`));

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
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка обновления аватара пользователя! ${err}`));

  const handleCardLike = card =>
    api
      .toggleLike(card)
      .then(newCard => setCards(state => state.map(c => (c._id === card._id ? newCard : c))))
      .catch(err => console.log(`Ошибка загрузки данных лайка карточки! ${err}`));

  const handleCardDelete = e => {
    e.preventDefault();
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка удаления карточки! ${err}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={openEditAvatarPopup}
            onEditProfile={openEditProfilePopup}
            onAddPlace={openAddPlacePopup}
            showFullImageClick={showFullImageClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={openDeleteCardPopup}
          />
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} name="full-image" type="popup__image-container" />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
