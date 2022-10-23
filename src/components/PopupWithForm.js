import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';

const PopupWithForm = props => {
  const textLoading = React.useContext(PopupOnLoadContext);
  const [isFormInvalid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (props.isOpen) setIsFormValid(true);
  }, [props.isOpen]);

  const handlerValidForm = e => {
    setIsFormValid(!e.currentTarget.checkValidity());
  };

  return (
    <Popup name={props.name} onClose={props.onClose} type={props.type} isOpen={props.isOpen}>
      <form className="form" name={props.name} onSubmit={props.onSubmit} onChange={handlerValidForm} noValidate>
        <h2 className={`form__title ${props.titleClassType && props.titleClassType}`}>{props.title}</h2>
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
