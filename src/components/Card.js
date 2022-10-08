const Card = props => {
  return (
    <li className="card" key={props.card._id}>
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={() => props.onCardClick(props.card)} />
      <h2 className="card__caption">{props.card.name}</h2>
      <div className="card__like-container">
        <button className="card__like" type="button" aria-label="Лайк"></button>
        <p className="card__likes-counter">{props.card.likes.length}</p>
      </div>
      <button className="card__delete" type="button" aria-label="Удалить карточку" onClick={props.onBasketClick}></button>
    </li>
  );
};

export default Card;
