import { useState, useEffect, useCallback, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [inputsValidate, setInputsValidate] = useState({ name: {}, about: {} });
  const { values, setValues, handleChange } = useForm({ name: '', about: '' });

  const getValidateData = useCallback(validateData => setInputsValidate(validateData), []);

  const handleSubmit = useCallback(() => onUpdateUser(values), [values, onUpdateUser]);

  useEffect(() => {
    if (isOpen) setValues(currentUser);
  }, [isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validate={getValidateData}
    >
      <input
        className={`form__input ${inputsValidate.name.message && 'form__input_type_error'}`}
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        value={values.name}
        onChange={handleChange}
        required
      />
      <span className="form__input-error">{inputsValidate.name.message}</span>
      <input
        className={`form__input ${inputsValidate.about.isInvalid && 'form__input_type_error'}`}
        type="text"
        name="about"
        minLength="2"
        maxLength="200"
        value={values.about}
        onChange={handleChange}
        required
      />
      <span className="form__input-error">{inputsValidate.about.message}</span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
