import { Switch, Route, Link } from 'react-router-dom';

const Navbar = ({ email, loggedIn, onSignOut, isOpen }) => (
  <div className={`navbar ${loggedIn && (isOpen ? 'navbar_state_showed' : 'navbar_state_hidden')}`}>
    <p className="navbar__email">{loggedIn && email}</p>
    <Switch>
      <Route path="/signin">
        <Link to="signup" className={`navbar__button ${loggedIn || 'navbar__button_showed'}`}>
          Регистрация
        </Link>
      </Route>
      <Route path="/signup">
        <Link to="signin" className={`navbar__button ${loggedIn || 'navbar__button_showed'}`}>
          Войти
        </Link>
      </Route>
      <Route path="/mesto-react">
        <Link to="/signin" className="navbar__button navbar__button_logged" onClick={onSignOut}>
          Выйти
        </Link>
      </Route>
    </Switch>
  </div>
);

export default Navbar;
