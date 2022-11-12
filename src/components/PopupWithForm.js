import { useState, useEffect, useCallback, useContext } from 'react';
import Popup from './Popup';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';

const PopupWithForm = props => {
  const textLoading = useContext(PopupOnLoadContext);
  const resetValidator = useCallback(
    () =>
      props.children
        ?.filter(item => item.type === 'input')
        .reduce((acc, item) => ({ ...acc, [item.props.name]: {} }), {}),
    [props.children]
  );
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [validator, setValidator] = useState(resetValidator());

  useEffect(() => {
    if (props.isOpen) {
      !props.children ? setIsFormInvalid(false) : setIsFormInvalid(true);
      setValidator(resetValidator());
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (props.validate) props.validate(validator);
  }, [validator]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      props.onSubmit();
      setIsFormInvalid(true);
    },
    [props.onSubmit]
  );

  const handleFormValidation = useCallback(
    e => {
      const { name, validationMessage, validity } = e.target;
      setValidator({
        ...validator,
        [name]: {
          message: validationMessage,
          isInvalid: !validity.valid,
        },
      });
      setIsFormInvalid(!e.currentTarget.checkValidity());
    },
    [validator]
  );

  return (
    <Popup onClose={props.onClose} type={`popup__form-container ${props.type}`} isOpen={props.isOpen}>
      <form className="form" name={props.name} onSubmit={handleSubmit} onChange={handleFormValidation} noValidate>
        <h2 className={`form__title ${props.titleClassType}`}>{props.title}</h2>
        {props.children}
        <button
          className={`form__submit-button ${isFormInvalid && 'form__submit-button_disabled'}`}
          type="submit"
          disabled={isFormInvalid}
        >
          {textLoading ? textLoading : props.buttonText || 'Сохранить'}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
