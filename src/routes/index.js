import { asyncLoadHOF } from './asyncLoad'

export const routes = [
  {
    name: 'cool store',
    path: '/',
    exactly: true,
    load: asyncLoadHOF(require('pages/home')),
  },
  {
    name: 'login',
    path: '/login',
    exactly: true,
    load: asyncLoadHOF(require('pages/login')),
  },
]