import FormLogin from './FormLogin';
import { Redirect } from 'react-router-dom';

const Register = ({ loggedIn, onSubmit }) =>
  loggedIn ? (
    <Redirect to="/" />
  ) : (
    <FormLogin onSubmit={onSubmit} name="register" title="Регистрация" buttonText="Зарегистрироваться" isRegister={true} />
  );

export default Register;
