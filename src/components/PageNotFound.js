import { Link } from 'react-router-dom';
import image from '../images/not-found.jpg';

const PageNotFound = () => (
  <div className="not-found">
    <img className="not-found__image" src={image} alt="Страница не найдена" />
    <Link className="not-found__link" to="/">
      ← Назад
    </Link>
  </div>
);

export default PageNotFound;
