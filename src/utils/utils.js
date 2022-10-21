export const uxWrap = (setter, callback, textLoading = 'Сохранение...') => {
  setter(textLoading);
  return callback().finally(() => setter(''));
};
