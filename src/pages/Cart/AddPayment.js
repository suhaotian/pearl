import React, { Component, PropTypes } from 'react'
import NavBar from '../common/NavBar'
import Loading from 'components/Loading'
import validate from './payment_validate'
import styles from './style.css'
import {m} from 'api/moltin'
import jump from 'jump.js'

import generateArray from 'utils/generateArray'
import leadingZero from 'utils/leadingZero'

class AddPayment extends Component {

  getOrderInfo = () => {
    this.order = JSON.parse(localStorage.getItem('ORDER_INFO')) || {}
    if (!this.order.id) {
      this.props.router.replaceWith('/cart')
      return {}
    }
    const info = this.order.bill_to.data

    return {
      first_name: info.first_name,
      last_name: info.last_name,
      number: '',
      expiry_month: '',
      expiry_year: '',
      cvv: '',
    }
  }

  state = {
    requesting: false,
    paying: false,
    ...this.getOrderInfo(),
  }

  componentDidMount() {
    jump(document.body, {duration: 10})
  }

  handlePay = () => {
    if (this.state.paying) return
    this.setState({paying: true, requesting: true})
    m('Checkout.Payment', 'purchase', this.order.id, {
      data: this.state
    })
    .then(res => {
      localStorage.removeItem('ORDER_INFO')
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
    localStorage.removeItem('ORDER_INFO')
  }

  render() {
    return (
      <div>
        <NavBar
          router={this.props.router}  
          back={'/cart/address'}
          replaceWith={true}
        />

        <div className={styles.title}>Payment information</div>

        <div className={styles.container}>
          <div className={styles.formTitle}>
            <span className={styles.name}>Card Number</span> 
          </div>
          <div>
            <input className={styles.input} type="number" pattern="[0-9]*" name="number"
              value={this.state.number}
              onChange={(e) => {this.setState({number: e.target.value})}}
            />
          </div>
          <div className={styles.formTitle}>
            <span className={styles.name}>Expiry Date</span> 
          </div>
          <div className={styles.flex}>
            <select className={styles.input} name="expiry_month"
              value={this.state.expiry_month}
              onChange={(e) => {this.setState({expiry_month: e.target.value})}}
            >
              <option value="-1">select month</option>
              {  
                generateArray(1, 12,leadingZero).map((item, index) => (
                  <option value={item} key={item}>{item}</option>
                ))
              }
            </select>
            <div style={{width: 20}}></div>
            <select className={styles.input} name="expiry_year"
              value={this.state.expiry_year}
              onChange={(e) => {this.setState({expiry_year: e.target.value})}}
            >
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
            <input className={styles.input} type="text" name="cvc" 
              value={this.state.cvc}
              onChange={(e) => {this.setState({cvc: e.target.value})}}
            />
          </div>
          <div className={styles.flex}>
            <div>
            <div className={styles.formTitle}>
              <span className={styles.name}>First Name</span> 
            </div>
            <div>
              <input
                className={styles.input} 
                type="text" 
                name="first_name"
                value={this.state.first_name}
                onChange={(e) => {this.setState({first_name: e.target.value})}}
              />
            </div>
            </div>
            <div style={{width: 15}}></div>
            <div>
              <div className={styles.formTitle}>
                <span className={styles.name}>Last Name</span> 
              </div>
              <div>
                <input 
                  className={styles.input} 
                  type="text" 
                  name="last_name"
                  value={this.state.last_name}
                  onChange={(e) => {this.setState({last_name: e.target.value})}}
                />
              </div>
            </div>
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