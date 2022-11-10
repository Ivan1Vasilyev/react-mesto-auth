import { useState, useEffect, useCallback, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({ name: '', about: '' });
  const [inputsValidate, setInputsValidate] = useState({ name: {}, about: {} });

  const getValidateData = useCallback(validateData => setInputsValidate(validateData), []);

  const handleInputChange = useCallback(
    e => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onUpdateUser(formData);
    },
    [formData, onUpdateUser]
  );

  useEffect(() => {
    if (isOpen) setFormData(currentUser);
  }, [isOpen]);

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} validate={getValidateData}>
      <input
        className={`form__input ${inputsValidate.name.isInvalid && 'form__input_type_error'}`}
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <span className="form__input-error">{inputsValidate.name.message}</span>
      <input
        className={`form__input ${inputsValidate.about.isInvalid && 'form__input_type_error'}`}
        type="text"
        name="about"
        minLength="2"
        maxLength="200"
        value={formData.about}
        onChange={handleInputChange}
        required
      />
      <span className="form__input-error">{inputsValidate.about.message}</span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
