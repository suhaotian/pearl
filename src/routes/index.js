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
    path: '/list',
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/ProductList'))
      })
    }),
  },
  {
    name: 'show',
    path: '/show/:id',
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/ProductDetail'))
      })
    }),
  },
  {
    name: 'cart',
    path: '/cart',
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/Cart'))
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
