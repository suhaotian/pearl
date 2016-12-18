/* eslint-disable */ 
import React, { Component, PropTypes } from 'react'
import NavBar from '../common/NavBar'
import TouchDelete from 'components/TouchDelete'
import currency from 'utils/currency'
import jump from 'jump.js'
import {m} from 'api/moltin'
import Loading from 'components/Loading'
import styles from './style.css'

class Cart extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    fetching: true,
    requesting: false,
    paying: false,
    json: {},
    error: null,
  }

  packaging_options = {}
  
  componentDidMount() {
    jump(document.body, {duration: 10})

    this.handleFetch()
  }

  componentWillUnmount() {
    this.willUnmount = true
  }


  handleFetch = () => {
    this.setState({fetching: true,})
    m('Cart.Contents').then(res => {
      if (this.willUnmount) return
      let contents = []
      for (let k in res.contents) {
        let item = res.contents[k]
        let product_id = null
        for (let k in item.modifiers) {  // get product id
          if(item.modifiers[k]) {
            if (item.modifiers[k].data && item.modifiers[k].data.product) {
              product_id = item.modifiers[k].data.product
            }
          }
        } 
        if (item.packaging_id) {
          let t = item.modifiers[Object.keys(item.modifier)[0]].var_title
          item.title = item.title.replace(' ' + t, '')
          item.var_title = t
          item.product_id = product_id
          contents.push(item)
          delete res.contents[k]
        } else {
          this.packaging_options[product_id] = item
        }
      }

      res.contents = contents

      this.setState({json: res, fetching: false,requesting: false })
    }).catch((e) => {
      if (this.willUnmount) return
      this.setState({fetching: false, requesting: false, error: e.message || e.error || "Errors: " + JSON.stringify(e.message)})
    })
  }
  
  handleDelete = (item) => {
    if(confirm('Are you sure want to delete this?')) {
      this.setState({requesting: true})
      m('Cart.Remove', item.id).then(res => {
        return m('Cart.Remove', this.packaging_options[item.packaging_id].id)
      }).then(res => {
        this.handleFetch()
      }).catch(e => {
        alert(e.error || e.message || JSON.stringify(e))
      }) 
    }
  }

  handlePay = () => {
    if (this.state.paying) return
    if(confirm('Will go to checkout ?')) {
      this.setState({paying: true, requesting: true})
      const bill_to = {
        first_name: 'Jon',
        last_name:  'Doe',
        address_1:  '123 Moltin Street',
        city:       'Mountain View',
        county:     'California',
        country:    'US',
        postcode:   'CA94040',
        phone:      '6507123124'
      }      
      m('Cart.Complete', {gateway: 'stripe', bill_to: bill_to})
        .then(order => {
          return m('Checkout.Payment', 'purchase', order.id, {
            data: {
              first_name:   'John',
              last_name:    'Doe',
              number:       '4242424242424242',
              expiry_month: '08',
              expiry_year:  '2020',
              cvv:          '123'
            }
          })
        })
        .then(res => {
          alert(res.message)
          return m('Cart.Delete').then(res => {
            if (this.willUnmount) return
            this.setState({paying: false, requesting: false})
            this.handleFetch()
            
          })
        })
        .catch(e => {
          if (this.willUnmount) return
          alert(e.message || JSON.stringify(e))
          this.setState({paying: false, requesting: false})
        })
    }
  }

  render() {
    const {fetching, error, json} = this.state
    let contentComponent = null
    if (fetching) {
      contentComponent = <Loading color="#000" />
    } else if (error) {
      contentComponent = <div>{error}</div>
    } else if (json.contents.length < 1){
      contentComponent = <div style={{textAlign: 'center', padding: '20px'}}>Shopping cart is empty. Go buy something!</div>
    }

    return (
      <div className={styles.wrap}>
        <NavBar
          router={this.context.router}
          back={'/list'}
        />
        <div className={styles.title}>Shopping cart</div>
        {
          contentComponent ? contentComponent : (
            <div className={styles.itemWrap}>
              {
                json.contents.map((item, i) => {
                  let packaging = this.packaging_options[item.packaging_id]
                  let p_price = packaging.totals.pre_discount.raw.without_tax
                  let infos = packaging.modifiers[Object.keys(packaging.modifier)[0]].var_title.split('__-__')
                  let p_title = infos[0]
                  let p_capacity = infos[1]
                  return (
                    <div key={item.id} className={styles.item}>
                      <TouchDelete len={-86}>
                        <div className={styles.rowWrap}>
                          <div className={styles.row1}>
                            <span className={styles.name}>{item.title}</span>
                            <span className={styles.total}>{currency(item.totals.pre_discount.raw.without_tax+p_price)}</span>
                          </div>
                          <div className={styles.row2}>
                            {item.var_title} x {item.quantity} {item.unit} <br/>
                            {p_title} ({p_capacity} {item.unit} per box)
                          </div>              
                        </div>
                        <div 
                          className={styles.delete} 
                          onClick={() => {
                            this.handleDelete(item)
                          }}
                        >delete</div>
                      </TouchDelete>
                    </div>
                  )
                })
              }          
            </div>
          )
        }

        {
          json.contents && json.contents.length > 0 ?
          <div className={styles.ft}>
            <div className={styles.btn} onClick={() => {
              this.props.router.transitionTo('/cart/address')
            }}>
              { 
                this.state.paying ? 
                <Loading color="#fff" /> : 
                <span>Confirm and pay {json.totals.post_discount.formatted.without_tax}</span>
              }
            </div>
          </div> : null
        }

        <div style={{height: 75}}></div>

        {
          this.state.requesting ? 
          <div
            onTouchMove={e => {e.preventDefault()}}
            style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(255,255,255,.5)', zIndex: 9,}}>
          </div> : null
        }
      </div>
    )
  }
}


Cart.defaultProps = {}

Cart.propTypes = {}

export default Cart