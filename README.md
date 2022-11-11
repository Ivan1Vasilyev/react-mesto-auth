# Проект: Место-Реакт

**Описание**

- Проект Место переносится на React.
- На данный момент реализован весь раелизованный ранее функционал:
  - при загрузке сраницы с сервера загружаются данные пользователя, его аватар и все карточки, ранее загруженные на сервер;
  - открываются модальные окна редактирования данных пользователя, смены аватара, добавления новой картинки и просмотра картинки карточки;
  - закрытие модальных окон работает как на кнопку закрытия, так и при клике на оверлэй или нажатии клавиши Escape;
  - кнопка удаления карточки открывает модальное окно, в котором пользователю предлагается подтвердить удаление;
  - реализована ux-обработка при обращении к серверу: пользователь видит менющийся текст кнопки;
  - реализована валидация форм:
    - пользователь может ввести данные, только если все поля формы заполнены верно;
    - пользователь видит под полем ввода браузерный текст ошибки, который обновляется в с каждым изменением в поле ввода;
    - при открытии модального окна кнопка отправки данных изначально заблокирована, кроме кнопки подтверждения удаления карточки.
  - реализована регистрация и авторизация пользователя:
    - пользователь должен сначала пройти регистрацию, затем авторизацию, в обоих случаях он вводит корректный email и пароль;
    - валидация корректного email происходит как при наборе текста, так и на стороне сервера, во втором случае пользователь увидит сообщение об ошибке во всплывшем окне;

**Технологии**

- Адаптивность и отзывчивость страницы реализована средствами Flex-box, Grid-layout и запросами @media.
- При загрузке страницы картинки, загруженные с сервера, добавляются в альбом с помощью javascript.
- Проект сделан на JavaScript-библиотеке React.
- Для реализации был сделан выбор в пользу функциональных компонентов.
- Навигация пользователя между основной страницей, страницей авторизации и регистрации реализована с помощью библиотеки "React-Router-DOM".

**ghPages**

- [Ссылка на проект](https://ivan1vasilyev.github.io/react-mesto-auth/)
