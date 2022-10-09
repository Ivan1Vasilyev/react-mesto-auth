const Card = ({ card, onBasketClick, onCardClick }) => {
  return (
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={() => onCardClick(card)} />
      <h2 className="card__caption">{card.name}</h2>
      <div className="card__like-container">
        <button className="card__like" type="button" aria-label="Лайк"></button>
        <p className="card__likes-counter">{card.likes.length}</p>
      </div>
      <button className="card__delete" type="button" aria-label="Удалить карточку" onClick={onBasketClick}></button>
    </li>
  );
};

export default Card;
