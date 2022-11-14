import '../index.css';
import { useEffect, useState, useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Page from './Page';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';
import { api } from '../utils/api.js';
import { uxWrap } from '../utils/utils';
import * as userAuth from '../utils/auth';

const App = () => {
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [textLoading, setTextLoading] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipOnError, setIsTooltipOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [onDeleteCard, setOnDeleteCard] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      api
        .loadDefaultData()
        .then(([userInfo, defaultCards]) => {
          setCurrentUser({ ...userInfo });
          setCards([...defaultCards]);
        })
        .catch(err => console.log(`Ошибка загрузки начальных данных! ${err}`));
    }
  }, [loggedIn]);

  const closeAllPopups = useCallback(() => {
    setSelectedCard({});
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);
    setConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }, []);

  const openEditAvatarPopup = useCallback(() => setEditAvatarPopup(true), []);
  const openEditProfilePopup = useCallback(() => setEditProfilePopup(true), []);
  const openAddPlacePopup = useCallback(() => setAddPlacePopup(true), []);
  const openDeleteCardPopup = useCallback(card => {
    setConfirmPopupOpen(true);
    setSelectedCard(card);
    setOnDeleteCard(true);
  }, []);

  const openLogOutPopup = useCallback(() => {
    setConfirmPopupOpen(true);
    setOnDeleteCard(false);
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
            setCurrentUser({ ...response });
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
    [cards]
  );

  const handleUpdateAvatar = useCallback(
    newAvatar =>
      uxWrap(setTextLoading, () =>
        api
          .setUserAvatar(newAvatar)
          .then(response => {
            setCurrentUser({ ...response });
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
    [selectedCard]
  );

  const authenticate = useCallback(data => {
    localStorage.setItem('jwt', data.token);
  }, []);

  const onLogin = useCallback(
    userData =>
      uxWrap(
        setTextLoading,
        async () => {
          try {
            const res = await userAuth.login(userData);
            authenticate(res);
            checkToken();
          } catch (err) {
            const errorMessage = await err;
            setIsTooltipOnError(true);
            setIsInfoTooltipOpen(true);
            setErrorMessage(errorMessage);
            console.log(errorMessage);
          }
        },
        'Вход...'
      ),
    []
  );

  const onRegister = useCallback(userData => {
    uxWrap(
      setTextLoading,
      async () => {
        try {
          const res = await userAuth.register(userData);
          if (res) {
            console.log(res);
            setIsTooltipOnError(false);
            setIsInfoTooltipOpen(true);
            history.push('/signin');
          }
        } catch (err) {
          const errorMessage = await err;
          setErrorMessage(errorMessage);
          setIsTooltipOnError(true);
          setIsInfoTooltipOpen(true);
          console.log(errorMessage);
        }
      },
      'Регистрация...'
    );
  }, []);

  const checkToken = useCallback(async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) throw new Error('Нет токена');
      const user = await userAuth.checkToken(jwt);
      if (user) {
        setEmail(user.data.email);
        setLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onSignOut = useCallback(() => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    closeAllPopups();
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Page>
      <CurrentUserContext.Provider value={currentUser}>
        <PopupOnLoadContext.Provider value={textLoading}>
          <Header email={email} loggedIn={loggedIn} onSignOut={openLogOutPopup} />
          <Switch>
            <ProtectedRoute
              component={Main}
              loggedIn={loggedIn}
              path="/main"
              onEditAvatar={openEditAvatarPopup}
              onEditProfile={openEditProfilePopup}
              onAddPlace={openAddPlacePopup}
              showFullImageClick={showFullImageClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={openDeleteCardPopup}
            />
            <Route path="/sign-in">
              <Login name="login" loggedIn={loggedIn} onSubmit={onLogin} />
            </Route>
            <Route path="/sign-up">
              <Register name="register" loggedIn={loggedIn} onSubmit={onRegister} />
            </Route>
            <Route path="/">{loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}</Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            onError={isTooltipOnError}
            errorMessage={errorMessage}
          />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmationPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onSubmit={onDeleteCard ? handleDeleteCard : onSignOut}
          />
          <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
        </PopupOnLoadContext.Provider>
      </CurrentUserContext.Provider>
    </Page>
  );
};

export default App;
