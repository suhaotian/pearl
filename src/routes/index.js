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
    name: 'pearl',
    path: '/list',
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('pages/List'))
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
