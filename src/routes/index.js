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
    path: '/admin/list',
    load: asyncLoadHOF(require('pages/ProductList')),
  },
  {
    name: 'edit',
    path: '/admin/edit/:id',
    exactly: true,
    load: asyncLoadHOF(require('pages/ProductEdit')),
  },
  {
    name: 'edit variety',
    path: '/admin/edit/variety/:id',
    load: asyncLoadHOF(require('../pages/ProductEdit/EditVariety'))
  },
]