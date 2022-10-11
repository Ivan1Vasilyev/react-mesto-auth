import React, { useEffect, useState } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

const Main = props => {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .loadDefaultData()
      .then(([userInfo, cardsCollection]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(cards.concat(cardsCollection));
      })
      .catch(err => console.log(`Ошибка загрузки данных! ${err}`));
  }, []);

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
            <Card key={card._id} card={card} onCardClick={props.onCardClick} onBasketClick={props.onBasketClick} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
