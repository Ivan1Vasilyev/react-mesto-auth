import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const [urlAvatar, setUrlAvatar] = React.useState('');
  const inputRef = React.useRef();

  const handleAvatarInputChange = () => setUrlAvatar(inputRef.current.value);
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  };
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      type="popup__form-container popup__form-container_type_edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        className="form__input"
        type="url"
        placeholder="Ссылка на новый аватар"
        name="avatar"
        value={urlAvatar}
        onChange={handleAvatarInputChange}
        required
      />
      <span className="form__input-error form__input-error_place_avatar"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
