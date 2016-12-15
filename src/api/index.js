import axios from 'axios'
import stringify from 'qs/lib/stringify'
import delay from 'utils/delay'

let access_token = null
const api_url = 'https://api.molt.in/'
const api_instance = axios.create({
  baseURL: `${api_url}v1/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

function get_token() {
  const config = {
    client_id: '2zFN0Mkx592JtRtSLqYuL3odYLCeATs1QobUuGlyYF', 
    client_secret: 'EnwkKKo6nKkOCdhr6wfdjdDsWkMdoLsQesgZEb6w6q',
    grant_type: 'client_credentials', // grant_type: 'implicit', 
  }
  return axios.post(`${api_url}oauth/access_token`, stringify(config)).then(res => {
    access_token = res.data
    // localStorage.setItem('moltin_token', JSON.stringify(access_token))
    return res.data
  })
}

export function create() {
  let token = access_token

  if (!token || new Date(token.expires*1000) < new Date()) {
    return get_token().then((res) => {
      api_instance.defaults.headers['Authorization'] = `Bearer ${res.access_token}`
      return api_instance
    })
  } else {
    api_instance.defaults.headers['Authorization'] = `Bearer ${token.access_token}`
    return Promise.resolve(api_instance)
  }
}

export function post(url, obj) {
  return create().then((instance) => {
    return instance.post(url, stringify(obj))
  })
}

export function ajax() {
  return create()  
}

export default axios

window.api = {
  axios,
  create,
  post,
  delay,
}

window.ajax = ajax