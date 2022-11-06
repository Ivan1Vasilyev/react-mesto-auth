import '../index.css';
import { useEffect, useState, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Page from './Page';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';
import { api } from '../utils/Api.js';
import { uxWrap } from '../utils/utils';
import * as userAuth from '../utils/auth';

const App = () => {
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopup] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [textLoading, setTextLoading] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    api
      .loadDefaultData()
      .then(([userInfo, defaultCards]) => {
        setCurrentUser(userInfo);
        setCards([...defaultCards]);
      })
      .catch(err => console.log(`Ошибка загрузки начальных данных! ${err}`));
  }, []);

  const closeAllPopups = useCallback(() => {
    setSelectedCard(null);
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);
    setDeleteCardPopup(false);
    setIsInfoTooltipOpen(false);
  }, []);

  const openEditAvatarPopup = useCallback(() => setEditAvatarPopup(true), []);
  const openEditProfilePopup = useCallback(() => setEditProfilePopup(true), []);
  const openAddPlacePopup = useCallback(() => setAddPlacePopup(true), []);
  const openDeleteCardPopup = useCallback(card => {
    setDeleteCardPopup(true);
    setSelectedCard(card);
  }, []);

  const showFullImageClick = useCallback(card => {
    setImagePopup(true);
    setSelectedCard(card);
  }, []);

  const handleUpdateUser = useCallback(
    userData =>
      uxWrap(setTextLoading, () =>
        api
          .editUserData(userData)
          .then(response => {
            setCurrentUser(response);
            closeAllPopups();
          })
          .catch(err => console.log(`Ошибка обновления данных пользователя! ${err}`))
      ),
    []
  );

  const handleAddPlace = useCallback(
    placeData =>
      uxWrap(setTextLoading, () =>
        api
          .addCard(placeData)
          .then(response => {
            setCards([response, ...cards]);
            closeAllPopups();
          })
          .catch(err => console.log(`Ошибка добавления новой карточки! ${err}`))
      ),
    []
  );

  const handleUpdateAvatar = useCallback(
    newAvatar =>
      uxWrap(setTextLoading, () =>
        api
          .setUserAvatar(newAvatar)
          .then(response => {
            setCurrentUser(response);
            closeAllPopups();
          })
          .catch(err => console.log(`Ошибка обновления аватара пользователя! ${err}`))
      ),
    []
  );

  const handleCardLike = useCallback(
    card =>
      api
        .toggleLike(card)
        .then(newCard => setCards(state => state.map(c => (c._id === card._id ? newCard : c))))
        .catch(err => console.log(`Ошибка загрузки данных лайка карточки! ${err}`)),
    []
  );

  const handleDeleteCard = useCallback(
    () =>
      uxWrap(
        setTextLoading,
        () =>
          api
            .deleteCard(selectedCard._id)
            .then(() => {
              setCards(cards => cards.filter(c => c._id !== selectedCard._id));
              closeAllPopups();
            })
            .catch(err => console.log(`Ошибка удаления карточки! ${err}`)),

        'Удаление...'
      ),
    []
  );

  const authenticate = useCallback(data => {
    localStorage.setItem('jwt', data.token);
    setLoggedIn(true);
  }, []);

  const onLogin = useCallback(async userData => {
    try {
      const res = await userAuth.authorize(userData);
      authenticate(res);
    } catch (err) {
      setErrorMessage('Неверные имя пользователя или пароль!');
      setIsInfoTooltipOpen(true);
      console.log(err);
    }
  }, []);

  const onRegister = useCallback(async userData => {
    try {
      const res = await userAuth.registrate(userData);
      if (res) {
        authenticate(res);
        setIsInfoTooltipOpen(true);
      }
      console.log(res);
    } catch (err) {
      setErrorMessage('Попробуйте ещё раз.');
      setIsInfoTooltipOpen(true);
      console.log(err);
    }
  }, []);

  const checkToken = useCallback(async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) throw new Error('Нет токена');
      const user = await userAuth.checkToken(jwt);
      if (user) {
        setEmail(user.email);
        setLoggedIn(true);
      }
    } catch {}
  });

  const onSignOut = useCallback(() => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }, [setLoggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Page>
        <Header />
        <Switch>
          <ProtectedRoute
            path="/mesto-react"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={openEditAvatarPopup}
            onEditProfile={openEditProfilePopup}
            onAddPlace={openAddPlacePopup}
            showFullImageClick={showFullImageClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={openDeleteCardPopup}
          />
          <Route path="/signin">
            <Login loggedIn={loggedIn} onSubmit={onLogin} />
          </Route>
          <Route path="/signup">
            <Register loggedIn={loggedIn} onSubmit={onRegister} />
          </Route>
          <Route>{loggedIn ? <Redirect to="/mesto-react" /> : <Redirect to="/signin" />}</Route>
        </Switch>
        <Footer />
        <PopupOnLoadContext.Provider value={textLoading}>
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} errorMessage={errorMessage} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleDeleteCard} />
        </PopupOnLoadContext.Provider>
        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
      </Page>
    </CurrentUserContext.Provider>
  );
};

export default App;
