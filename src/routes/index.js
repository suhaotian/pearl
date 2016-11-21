import { asyncLoadHOF } from './asyncLoad'

export const routes = [
  {
    name: 'cool store',
    path: '/',
    exactly: true,
    load: asyncLoadHOF(require('pages/Home')),
  },
  {
    name: 'login',
    path: '/login',
    exactly: true,
    load: asyncLoadHOF(require('pages/Login')),
  },
  {
    name: 'detail',
    path: '/detail/:id',
    load: asyncLoadHOF(require('pages/ProductDetail')),
  },
  {
    name: 'list',
    path: '/list',
    load: asyncLoadHOF(require('pages/ProductList')),
  },
  {
    name: 'edit',
    path: '/edit/:id',
    load: asyncLoadHOF(require('pages/ProductEdit')),
  },

]