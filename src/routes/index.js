import asyncLoad from './asyncLoad'

export const routes = [
  {
    name: 'cool store',
    path: '/',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Home'))
      })
    }),
  },
  {
    name: 'login',
    path: '/login',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Login'))
      })
    }),
  },
  {
    name: 'detail',
    path: '/detail/:id',
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/ProductDetail'))
      })
    }),
  },
  {
    name: 'list',
    path: '/admin/list',
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/ProductList'))
      })
    }),
  },
  {
    name: 'edit',
    path: '/admin/edit/:id',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/ProductEdit'))
      })
    }),
  },
  {
    name: 'edit variety',
    path: '/admin/edit/variety/:id',
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('../pages/ProductEdit/EditVariety'))
      })
    }),
  },
]
