import logo from '../images/logo.svg';
import Navbar from './Navbar';

const Header = props => (
  <header className="header">
    <img className="header__logo" src={logo} alt="Логотип" />
    <Navbar {...props} />
  </header>
);

export default Header;
