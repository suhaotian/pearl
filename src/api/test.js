let access_token = null
let expires = null

function wrapper(handler, ...args) {
  return new Promise((resolve, reject) => {
    handler(...args, function (res) {
      resolve(res)
    }, function(error, body) {
      reject(body)
    })
  })
}

function m(handler, ...args) {
  if (!access_token || new Date(expires*1000)) < new Date()) {
    return wrapper(moltin.Authenticate).then(res => {
      access_token = res.access_token
      expires = res.expires
      return wrapper(handler, ...args)
    })
  } else {
    return wrapper(handler, ...args)
  }
}


// get category list
m(moltin.Category.List)
  .then(res => {

  })
  .catch(e => {

  })

// get product list
m(moltin.Product.Search, {category: 6}).then(res => {
  console.log(res)
})

// get product and packagings  // detail
// js parse

// add to cart 
//  select variation and packaging options, 
//

m(moltin.Cart.Insert, )

// moltin.Cart.Insert('<PRODUCT ID>', '<QUANTITY>', {'<MODIFIER ID>': '<VARIATION ID>'}, function(cart) {
//     console.log(cart);
// }, function(error) {
//     // Something went wrong...
// });



// usage
m(moltin.Category.List)
  .then((res) => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })
