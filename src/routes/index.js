import asyncLoad from './asyncLoad'

export const routes = [
  {
    name: 'cool store',
    path: '/',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('../frontend/home/index'))
      })
    }),
  },
  {
    name: 'login',
    path: '/login',
    exactly: true,
    load: asyncLoad((cb) => {
      require.ensure([], (require) => {
        cb(require('../frontend/login/index'))
      })
    }),
  },
]