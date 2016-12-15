const Moltin = false || window.Moltin 
let access_token = null
let expires = null

export const moltin = new Moltin({publicId: '2zFN0Mkx592JtRtSLqYuL3odYLCeATs1QobUuGlyYF'})

function wrapper(handler, ...args) {
  return new Promise(function (resolve, reject) {
    handler = handler.split('.')
    moltin[handler[0]][handler[1]](...args, function (res) {
      resolve(res)
    }, function(error, body) {
      reject(body)
    })
  })
}

export function m(handler, ...args) {
  if (!access_token || new Date(expires*1000) < new Date()) {
    return new Promise(function(resolve, reject) {
      moltin.Authenticate(function(res) {
        access_token = res.access_token
        expires = res.expires
        resolve(res)
      }, function(error, body) {
        reject(body)
      })
    }).then(function (res) {
      return wrapper(handler, ...args)
    })
  } else {
    return wrapper(handler, ...args)
  }
}


export function auth() {
  return new Promise(function(resolve, reject) {
    moltin.Authenticate(function(res) {
      resolve(res)
    }, function(error, body) {
      reject(body)
    })
  })
}