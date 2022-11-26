import { useCallback, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [inputsValidate, setInputsValidate] = useState({ name: {}, link: {} });
  const { values, setValues, handleChange } = useForm({ name: '', link: '' });

  useEffect(() => {
    if (isOpen) {
      setValues({ name: '', link: '' });
    }
  }, [isOpen]);

  const getValidateData = useCallback(validateData => setInputsValidate(validateData), []);

  const handleSubmit = useCallback(() => onAddPlace(values), [values, onAddPlace]);

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validate={getValidateData}
      buttonText="Создать"
    >
      <input
        className={`form__input ${inputsValidate.name.isInvalid && 'form__input_type_error'}`}
        type="text"
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
        required
      />
      <span className="form__input-error">{inputsValidate.name.message}</span>
      <input
        className={`form__input ${inputsValidate.link.isInvalid && 'form__input_type_error'}`}
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        value={values.link}
        onChange={handleChange}
        required
      />
      <span className="form__input-error">{inputsValidate.link.message}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
