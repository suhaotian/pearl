/* eslint-disable */
import {ajax, post} from 'api'
import stringify from 'qs/lib/stringify'
import shallowequal from 'shallowequal'

function editValidate(state, that) {
  let productID = that.props.params.id
  let packagingID = that.packagingID
  const {
    name, description, unit, variations, packagings
  } = state
  const errors = []

  if (!name) {
    errors.push('Product name is required')
    window.scrollTo(0, 0)
  }

  if (!description) {
    errors.push('Description is required')
    window.scrollTo(0, 0)
  }

  if (!unit) {
    errors.push('Please select unit of measure')
  }

  for (let i = 0; i < variations.length; i++) {
    const {type, stock, price} = variations[i]
    if (!type || (!stock && stock==0) || (!price && price==0)) {
      errors.push('Variations, type/stock/price is required')
      break
    }
  }

  for (let i = 0; i < packagings.length; i++) {
    const {type, stock, price} = packagings[i]
    if (!type || (!stock && stock==0) || (!price && price==0)) {
      errors.push('Packaging options type/capacity/price is required')
      break
    }
  }

  if (errors.length > 0) {
    alert('Errors: \n\n' + errors.join(', \n\n')+'.')
  } else {
    let o_state = JSON.parse(localStorage.getItem('OSTATE'))
    const requests = []
    productID = that.props.params.id
    packagingID = that.packagingID
    // Do we need update product ?
    if (name !== o_state.name || description !== o_state.description || unit !== o_state.unit) {
      let total_stock = 0, main_price = variations[0].price
      for (let i = 0; i < variations.length; i++) {
        total_stock += parseFloat(variations[i].stock)
      }
      requests.push(
        () => (ajax().then(instance => {
          return instance.put(`products/${productID}`, stringify({
            title: name,
            description,
            unit,
            stock_level: total_stock,
            price: main_price,
          }))
        }))
      )
    }

    // Do we need update variation ?
    // Do we need create variation ?
    for (let i = 0; i < variations.length; i++) {
      const item = variations[i]
      if (item.is_new) {
        requests.push(
          () => (ajax().then(instance => {
            return instance.post(`products/${productID}/modifiers/${that.product_mid}/variations`, stringify({
              title: item.type,
              mod_price: `=${item.price}`,
              stock_level: item.stock,
              stock_status: 1,
            }))
          }))
        )
      } else {
        for (let k = 0; k < o_state.variations.length; k++) {
          if (o_state.variations[k].id === item.id) {
            if (!shallowequal(o_state.variations[k], item)) {
              requests.push(
                () => (
                  ajax().then(instance => {
                    return instance.put(`products/${productID}/modifiers/${that.product_mid}/variations/${item.id}`, stringify({
                      title: item.type,
                      mod_price: `=${item.price}`,
                      stock_level: item.stock,
                      stock_status: 1,
                    }))
                  })
                )
              )
            }
            break
          }
        }
      }
    }

    // Do we need update packaging ?
    // Do we need create packaging ?
    //
    for (let i = 0; i < packagings.length; i++) {
      const item = packagings[i]
      if (item.is_new) {
        requests.push(
          () => (ajax().then(instance => {
            return instance.post(`products/${packagingID}/modifiers/${that.packaging_mid}/variations`, stringify({
              title: item.type + '__-__' + item.capacity,
              mod_price: `=${item.price}`,
              stock_level: 1e9,
              stock_status: 0,
            }))
          }))
        )
      } else {
        for (let k = 0; k < o_state.packagings.length; k++) {          
          if (o_state.packagings[k].id === item.id) {
            if (!shallowequal(o_state.packagings[k], item)) {
              requests.push(
                () => (
                  ajax().then(instance => {
                    return instance.put(`products/${packagingID}/modifiers/${that.packaging_mid}/variations/${item.id}`, stringify({
                      title: item.type + '__-__' + item.capacity,
                      mod_price: `=${item.price}`,
                      stock_level: 1e9,
                      stock_status: 0,
                    }))
                  })
                )
              )
            }
            break
          }
        }
      }
    }

    if (requests.length < 1) {
      that.props.router.replaceWith('/admin')
      return
    }
    that.setState({requesting: true})

    function recordValue(results, value) {
        results.push(value)
        return results
    }

    const pushValue = recordValue.bind(null, [])

    requests.reduce(function (promise, item) {
        return promise.then(() => {
          return item()
        }).then(pushValue)
    }, Promise.resolve()).then((results) => {
      if (that.willUnoumt) return
      that.setState({requesting: false})
      alert('Save success!')
      that.props.router.replaceWith('/admin')
    })
  }
}


export default editValidate