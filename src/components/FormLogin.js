import { useState } from 'react';
import { Link } from 'react-router-dom';

const FormLogin = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  return (
    <div className="form-login">
      <form className="form-login__form" name={props.name} onSubmit={handleSubmit} noValidate>
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
        <input
          className="form-login__input"
          type="password"
          name="password"
          placeholder="Пароль"
          autoComplete="on"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button className="form-login__submit-button" type="submit" disabled={props.isFormInvalid}>
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
