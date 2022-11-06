import FormLogin from './FormLogin';
import { Redirect } from 'react-router-dom';

const Login = ({ loggedIn, onSubmit }) =>
  loggedIn ? <Redirect to="/" /> : <FormLogin onSubmit={onSubmit} name="login" title="Вход" buttonText="Войти" />;

export default Login;
