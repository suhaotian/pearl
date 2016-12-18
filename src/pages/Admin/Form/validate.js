/* eslint-disable */
import {ajax, post} from 'api'

function validate(state, categoryID, that) {
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
    let packagingID = null, productID = null
    that.setState({requesting: true})
    let total_stock = 0, main_price = variations[0].price
    for (let i = 0; i < variations.length; i++) {
      total_stock += parseFloat(variations[i].stock)
    }
    ajax()
      .then(instance => {
        return post('products', {   // create packaging
          title: `packaging-${name}`,
          description,
          unit,
          sku: `${unit}-${new Date().getTime()}`,
          slug: `packaging-${new Date().getTime()}`,
          requires_shipping: 0,
          status: 1,
          stock_level: 100,
          stock_status: 1,
          category: categoryID,
          catalog_only: 0,
          tax_band: '1396202847816647595',
          price: 100,
        })
        .then(res => {      // create packaging modifiers
          packagingID = res.data.result.id
          return post(`products/${packagingID}/modifiers`, {
            title: 'packaging', type: 'variant'
          })
        })
        .then(res => {
            
            function recordValue(results, value) {
                results.push(value)
                return results
            }

            const pushValue = recordValue.bind(null, [])

            return packagings.reduce(function (promise, item) {
                return promise.then(() => {
                  return post(`products/${packagingID}/modifiers/${res.data.result.id}/variations`, {
                    title: item.type + '__-__' + item.capacity,
                    mod_price: `=${item.price}`,
                    stock_level: 1e9,
                    stock_status: 0,
                  })
                }).then(pushValue)
            }, Promise.resolve())
          })
      })
      .then(() => {              // create main product
        return post('products', {
          title: name,
          description,
          unit,
          sku: `${unit}-${new Date().getTime()}`,
          slug: `product-${new Date().getTime()}`,
          requires_shipping: 0,
          status: 1,
          stock_level: total_stock,
          stock_status: 1,
          packaging_id: packagingID,
          category: categoryID,
          catalog_only: 0,
          tax_band: '1396202847816647595',
          price: main_price,
        })
      })
      .then(res => {
        productID = res.data.result.id
        return post(`products/${productID}/modifiers`, {
          title: 'variations', type: 'variant'
        })
      }).then(res => {

        function recordValue(results, value) {
            results.push(value)
            return results
        }

        const pushValue = recordValue.bind(null, [])

        return variations.reduce(function (promise, item) {
            return promise.then(() => {
              return post(`products/${productID}/modifiers/${res.data.result.id}/variations`, {
                title: item.type,
                mod_price: `=${item.price}`,
                stock_level: item.stock,
                stock_status: 1,
              })
            }).then(pushValue)
        }, Promise.resolve())
      })
      .then(() => {
        // that.setState({requesting: false})
        alert('Create success!')
        that.props.router.replaceWith('/admin')
      }).catch(e => {
        if (that.willUnoumt) return
        that.setState({requesting: false})
        alert(e.message)
      })
  }
}


export default validate