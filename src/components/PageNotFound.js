import { Link } from 'react-router-dom';
import image from '../images/not-found.jpg';
import littleImage from '../images/not-found-mobile.jpg';

const PageNotFound = () => (
  <div className="not-found">
    <picture>
      <source srcSet={image} media="(min-width: 590px)" />
      <img className="not-found__image" src={littleImage} alt="Страница не найдена" />
    </picture>
    <Link className="not-found__link" to="/">
      ← Назад
    </Link>
  </div>
);

export default PageNotFound;
