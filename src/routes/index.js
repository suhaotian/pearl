import asyncLoad from './asyncLoad'

export const routes = [
  {
    name: 'pearl',
    path: '/',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Home'))
      })
    }),
  },
  {
    name: 'list',
    path: '/list/:id',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/ProductList'))
      })
    }),
  },
  {
    name: 'show',
    path: '/show/:category_id/:id',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/ProductDetail'))
      })
    }),
  },
  {
    name: 'cart',
    path: '/cart',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Cart'))
      })
    }),
  },
  {
    name: 'address',
    path: '/cart/address',
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Cart/AddAddress'))
      })
    }),
  },
  {
    name: 'payment',
    path: '/cart/payment',
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Cart/AddPayment'))
      })
    }),
  },
  {
    name: 'admin-home',
    path: '/admin',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Admin'))
      })
    }),
  },
  {
    name: 'admin-form',
    path: '/admin/:id',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Admin/Form/create'))
      })
    }),
  },
  {
    name: 'admin-form',
    path: '/admin/edit/:id',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Admin/Form/edit'))
      })
    }),
  },
]

export const redirectRoutes = [
  {
    from: '/home/',
    to: '/',
  }
]
