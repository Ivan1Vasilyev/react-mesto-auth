export const uxWrap = (setter, callback, textLoading = 'Сохранение...') => {
  setter(textLoading);
  return callback().finally(() => setter(''));
};

export const handleError = async err => {
  const error = await err;
  console.log(error.message);
};
