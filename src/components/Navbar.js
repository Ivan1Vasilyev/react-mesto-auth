import { Switch, Route, Link } from 'react-router-dom';

const Navbar = ({ email, loggedIn, onSignOut, isOpen }) => (
  <div className={`navbar ${loggedIn && (isOpen ? 'navbar_state_showed' : 'navbar_state_hidden')}`}>
    <p className="navbar__email">{loggedIn && email}</p>
    <Switch>
      <Route path="/sign-in">
        <Link to="sign-up" className={`navbar__button ${loggedIn || 'navbar__button_showed'}`}>
          Регистрация
        </Link>
      </Route>
      <Route path="/sign-up">
        <Link to="sign-in" className={`navbar__button ${loggedIn || 'navbar__button_showed'}`}>
          Войти
        </Link>
      </Route>
      <Route path="/main">
        <Link to="/sign-in" className="navbar__button navbar__button_logged" onClick={onSignOut}>
          Выйти
        </Link>
      </Route>
    </Switch>
  </div>
);

export default Navbar;
