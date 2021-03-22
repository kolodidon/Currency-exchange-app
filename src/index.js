import React from 'react';
import ReactDOM from 'react-dom';
//ИМПОРТИРУЕМ КОМПОНЕНТ BrowserRouter ДЛЯ РЕАЛИЗАЦИИ РОУТИНГА
import {BrowserRouter} from 'react-router-dom'
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

//СОЗДАЕМ ПЕРЕМЕННУЮ, В КОТОРОЙ ОБОРАЧИВАЕМ В <BrowserRouter> ВЫЗОВ
//НАШЕГО КОРНЕВОГО КОМПОНЕНТА APP, ЗАТЕМ В РЕНДЕРЕ ПРОПИСЫВАЕМ ЭТУ ПЕРЕМЕННУЮ
const app = 
<BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</BrowserRouter>

ReactDOM.render(
  //ВОТ, ВЫЗОВ НАШЕГО ОБЁРТЫША
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
