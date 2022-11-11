import { useCallback, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [formData, setFormData] = useState({ name: '', link: '' });
  const [inputsValidate, setInputsValidate] = useState({ name: {}, link: {} });

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', link: '' });
    }
  }, [isOpen]);

  const getValidateData = useCallback(validateData => setInputsValidate(validateData), []);

  const handleInputChange = useCallback(
    e => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSubmit = useCallback(() => onAddPlace(formData), [formData, onAddPlace]);

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
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <span className="form__input-error">{inputsValidate.name.message}</span>
      <input
        className={`form__input ${inputsValidate.link.isInvalid && 'form__input_type_error'}`}
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        value={formData.link}
        onChange={handleInputChange}
        required
      />
      <span className="form__input-error">{inputsValidate.link.message}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
