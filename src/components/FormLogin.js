import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const FormLogin = props => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [inputsValidate, setInputsValidate] = useState({ email: '', password: '' });
  const [isFormInvalid, setIsFormInvalid] = useState(false);

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

  const handleInputChange = useCallback(
    e => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      props.onSubmit(formData);
    },
    [formData]
  );

  return (
    <div className="form-login">
      <form className="form-login__form" name={props.name} onSubmit={handleSubmit} onChange={handleFormValidation} noValidate>
        <h2 className="form-login__title">{props.title}</h2>
        <input
          className="form-login__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
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
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <span className="form-login__input-error">{inputsValidate.password}</span>
        <button className="form-login__submit-button" type="submit" disabled={isFormInvalid}>
          {props.buttonText}
        </button>
      </form>
      {props.isRegister && (
        <p className="form-login__caption">
          {'Уже зарегистрированы? '}
          <Link to="/signin" className="form-login__link">
            Войти
          </Link>
        </p>
      )}
    </div>
  );
};

export default FormLogin;
