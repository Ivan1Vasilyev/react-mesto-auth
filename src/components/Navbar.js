import { Switch, Route, Link } from 'react-router-dom';

const Navbar = ({ email, loggedIn, onSignOut }) => (
  <div className="navbar">
    <p className="navbar__email">{loggedIn && email}</p>
    <Switch>
      <Route path="/signin">
        <Link to="signup" className="navbar__button">
          Регистрация
        </Link>
      </Route>
      <Route path="/signup">
        <Link to="signin" className="navbar__button">
          Войти
        </Link>
      </Route>
      <Route path="/mesto-react">
        <Link to="/signin" className="navbar__button navbar__button_logged " onClick={onSignOut}>
          Выйти
        </Link>
      </Route>
    </Switch>
  </div>
);

export default Navbar;
