import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div className="not-found">
    <Link className="not-found__link" to="/">
      ← Назад
    </Link>
  </div>
);

export default PageNotFound;
