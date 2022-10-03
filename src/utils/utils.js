export const uxWrap = (button, callback, loadingText = 'Сохранение...') => {
  const defaultText = button.textContent;
  button.textContent = loadingText;
  return callback().finally(() => (button.textContent = defaultText));
};
