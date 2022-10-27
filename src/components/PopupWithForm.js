import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';

const PopupWithForm = props => {
  const textLoading = React.useContext(PopupOnLoadContext);

  const resetValidator = () => props.children?.filter(item => item.type === 'input').reduce((acc, item) => ({ ...acc, [item.props.name]: {} }), {});

  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [validator, setValidator] = useState(resetValidator());

  useEffect(() => {
    if (props.isOpen) {
      setIsFormInvalid(true);
      setValidator(resetValidator());
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (props.validate) props.validate(validator);
  }, [validator]);

  const handleFormValidation = e => {
    setValidator({
      ...validator,
      [e.target.name]: {
        message: e.target.validationMessage,
        isInvalid: !e.target.validity.valid,
      },
    });
    setIsFormInvalid(!e.currentTarget.checkValidity());
  };

  return (
    <Popup onClose={props.onClose} type={props.type} isOpen={props.isOpen}>
      <form className="form" name={props.name} onSubmit={props.onSubmit} onChange={handleFormValidation} noValidate>
        <h2 className={`form__title ${props.titleClassType}`}>{props.title}</h2>
        {props.children}
        <button
          className={`form__submit-button ${props.isButtonEnabled ? '' : isFormInvalid && 'form__submit-button_disabled'}`}
          type="submit"
          disabled={props.isButtonEnabled ? false : isFormInvalid}
        >
          {textLoading ? textLoading : props.buttonText || 'Сохранить'}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
