import React, { useState } from 'react';
import { api } from '../utils/Api.js';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  useState(() => {
    api
      .getUserInfo()
      .then(response => {
        setUserName(response.name);
        setUserDescription(response.about);
        setUserAvatar(response.avatar);
        return response;
      })
      .catch(console.log);
  }, []);

  useState(() => {
    api
      .getDefaultCards()
      .then(response => {
        setCards([...response]);
      })
      .catch(console.log);
  }, [cards]);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__edit-avatar" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
        </button>
        <div className="profile__info">
          <h1 className="profile__user-name">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          <p className="profile__user-info">{userDescription}</p>
        </div>
        <button className="profile__button" type="button" aria-label="Добавить картинку" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {cards.map(card => (
            <li className="card" key={card._id}>
              <img className="card__image" src={card.link} alt={card.name} />
              <h2 className="card__caption">{card.name}</h2>
              <div className="card__like-container">
                <button className="card__like" type="button" aria-label="Лайк"></button>
                <p className="card__likes-counter">{card.likes.length}</p>
              </div>
              <button className="card__delete" type="button" aria-label="Удалить карточку"></button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
