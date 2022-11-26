import { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';
import useForm from '../hooks/useForm';

const FormLogin = props => {
  const textLoading = useContext(PopupOnLoadContext);
  const [inputsValidate, setInputsValidate] = useState({ email: '', password: '' });
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleFormValidation = useCallback(
    e => {
      const { name, validationMessage } = e.target;
      setInputsValidate({
        ...inputsValidate,
        [name]: validationMessage,
      });
      setIsFormInvalid(!e.currentTarget.checkValidity());
    },
    [inputsValidate]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      props.onSubmit(values);
      setIsFormInvalid(true);
    },
    [values]
  );

  return (
    <div className="form-login">
      <form
        className="form-login__form"
        name={props.name}
        onSubmit={handleSubmit}
        onChange={handleFormValidation}
        noValidate
      >
        <h2 className="form-login__title">{props.title}</h2>
        <input
          className="form-login__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <span className="form-login__input-error">{inputsValidate.email}</span>
        <input
          className="form-login__input"
          type="password"
          name="password"
          minLength={4}
          placeholder="Пароль"
          autoComplete="on"
          value={values.password}
          onChange={handleChange}
          required
        />
        <span className="form-login__input-error">{inputsValidate.password}</span>
        <button className="form-login__submit-button" type="submit" disabled={isFormInvalid}>
          {textLoading ? textLoading : props.buttonText}
        </button>
      </form>
      {props.isRegister && (
        <p className="form-login__caption">
          {'Уже зарегистрированы? '}
          <Link to="/sign-in" className="form-login__link">
            Войти
          </Link>
        </p>
      )}
    </div>
  );
};

export default FormLogin;
