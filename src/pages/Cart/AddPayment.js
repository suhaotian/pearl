import React, { Component, PropTypes } from 'react'
import NavBar from '../common/NavBar'
import Loading, {GlobalLoading} from 'components/Loading'
import validate from './payment_validate'
import styles from './style.css'
import {m} from 'api/moltin'
import jump from 'jump.js'

function generateArray(start, end) {
  let t = []
  for (;start <= end; start++) {
    t.push(start)
  }

  return t
}

class AddPayment extends Component {
  // static defaultProps = {}

  // static propTypes = {}

  state = {
    requesting: false,
    paying: false,
  }

  componentDidMount() {
    jump(document.body, {duration: 10})
  }

  handlePay = () => {
    return
    if (this.state.paying) return
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
          this.props.router.replaceWith('/cart')
        })
      })
      .catch(e => {
        if (this.willUnmount) return
        alert(e.message || JSON.stringify(e))
        this.setState({paying: false, requesting: false})
      })
  }


  componentWillUnmount() {
    this.willUnmount = true
  }

  render() {
    return (
      <div>
        <NavBar
          router={this.context.router}  
          back={'/'}
        />

        <div className={styles.title}>Payment information</div>

        <div className={styles.container}>
          <div className={styles.formTitle}>
            <span className={styles.name}>Card Number</span> 
          </div>
          <div>
            <input className={styles.input} type="number" pattern="[0-9]*" name="number"/>
          </div>
          <div className={styles.formTitle}>
            <span className={styles.name}>Expiry Date</span> 
          </div>
          <div>
            <select className={styles.input} name="expiry_month">
              <option value="-1">select month</option>
              {  
                generateArray(1, 12).map((item, index) => (
                  <option value={item} key={item}>{item}</option>
                ))
              }
            </select>
            <select className={styles.input} name="expiry_year">
              <option value="-1">select year</option>
              {
                generateArray(2016, 2100).map((item, index) => (
                  <option value={item} key={item}>{item}</option>
                ))
              }
            </select>
          </div>
          <div className={styles.formTitle}>
            <span className={styles.name}>CVC</span> 
          </div>
          <div>
            <input className={styles.input} type="text" name="cvc" />
          </div>

        </div>


        <div className={styles.ft}>
          <div className={styles.btn} onClick={() => {
            // this.props.router.transitionTo('/cart/payment')
            this.handlePay()
          }}>
            {
              this.state.requesting ?
              <Loading color="#fff" /> :
              <span>Confirm and checkout</span>
            }
          </div>
        </div>
        <div style={{height: 80}}></div>

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

export default AddPayment