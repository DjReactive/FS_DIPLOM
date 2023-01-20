# Дипломный проект по профессии «Веб-разработчик»
FrontEnd часть проекта, где за основу был взят фреймворк ReactJS: несложный, удобный и понятный. Для развертывания данной части проекта потребуется следующее:
- Node Package Manager (NPM)

### Описание проекта
Сайт кинотеатра с административной частью, без регистрации и возможностью бронировать билеты на сеансы.

## BackEnd

Необходимая часть проекта при развертывании FrontEnd. По ссылке вы можете пройти во  [BackEnd] данного проекта. В качестве BackEnd был взят за основу фреймворк Laravel, взаимодействующий с данной частью проекта с помощью RestAPI.

## Зависимости

В проекте для backend были использованы следующие зависимости:

- [ReactJS] - Прекрасный фреймворк для Javascript
- [MobX] - Библиотека, заменяющая React Redux

## Установка

Перед выполнением установки проекта вам потребуется скачать и установить NPM (Node Package Manager).

1. После установки NPM, перейдите в папку с FrontEnd и установите используемые зависимости

```sh
npm install
```
2. Создайте файл .env со следующим содержимым (где значением будет ваш BackEnd URL):

```sh
REACT_APP_SERVER_URL = http://localhost:8000
```
3. Для запуска сервера используйте следующую команду:

```sh
npm run start
```

## Важно!
- Данный проект был создан в учебных целях. 
- Для полноценной работы проекта необходимо установить [BackEnd].

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [ReactJS]: <https://ru.reactjs.org>
   [MobX]: <https://mobx.js.org/README.html>
   [BackEnd]: <https://github.com/DjReactive/FS_DIPLOM_BACKEND>
