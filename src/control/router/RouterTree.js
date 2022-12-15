import { ComponentImporter } from './ComponentImporter'
const {
  Main, Choice, Payment, Ticket, PageNotFound,
  Admin, Authorize,
} = ComponentImporter;

export const RouterDir = {
  admin: '/admin',
  auth: '/login',
}

export const RouterTree = [
  { /* Guest Access */
    access: 0,
    routes: [
      { dir: '/', title: 'Главная', element: <Main /> },
      { dir: '*', title: '404 Ошибка', element: <PageNotFound /> },
      { dir: '/login', title: 'Авторизация', element: <Authorize /> },
    ]
  }, { /* User Access */
    access: 0,
    routes: [
      { dir: '/choice', title: 'Выбор сеанса', element: <Choice /> },
      { dir: '/payment', title: 'Оплата', element: <Payment /> },
      { dir: '/ticket', title: 'Тикет', element: <Ticket /> },
    ]
  }, { /* Admin Access */
    access: 3,
    routes: [
      { dir: '/admin', title: 'Управление', element: <Admin/> }
    ]
  },
];
