import React, { Component } from 'react'
import NavBar from '../common/NavBar'
import Loading from 'components/Loading'
// import validate from './address_validate'
import jump from 'jump.js'
import {m} from 'api/moltin'
import isEmail from 'validator/lib/isEmail'
import styles from './style.css'

class AddAddress extends Component {

  getAddressInfo = () => {
    return (
      JSON.parse(localStorage.getItem('ADDRESS_INFO')) ||
      {
        requesting: false,
        paying: false,
        first_name: '',
        last_name: '',
        address_1: '',
        country: '',
        postcode: '',
        email: '',
      }
    )
  }

  state = this.getAddressInfo()

  componentDidMount() {
    jump(document.body, {duration: 10})
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  handleCheckout = () => {
    if (this.state.paying) return
    if (!this.state.first_name) {
      alert('First Name is required')
      return
    } else if (!this.state.last_name) {
      alert('Last Name is required')
      return
    } else if (!isEmail(this.state.email)) {
      alert('Please type correct email')
      return
    } 

    localStorage.setItem('ADDRESS_INFO', JSON.stringify(this.state))
    this.setState({paying: true, requesting: true})
    m('Cart.Complete', {gateway: 'stripe', customer: {
      first_name: this.state.first_name, 
      last_name: this.state.last_name,
      email: this.state.email,
    }, bill_to: this.state})
      .then(order => {
        if (this.willUnmount) return
        localStorage.setItem('ORDER_INFO', JSON.stringify(order))
        this.props.router.transitionTo('/cart/payment')
      })
      .catch(e => {
        if (this.willUnmount) return
        alert(e.message || (e.billing_address && 'Errors:\n\n' + e.billing_address.join('\n\n')) || JSON.stringify(e))
        this.setState({paying: false, requesting: false})
      })
  }


  render() {
    return (
      <div>
        <NavBar
          router={this.props.router}  
          back={'/cart'}
          replaceWith={true}
        />

        <div className={styles.title}>Billing address</div>

        <div className={styles.container}>
          <div>
            <div className={styles.formTitle} style={{marginTop: 0}}>
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

            <div className={styles.formTitle}>
              <span className={styles.name}>Email</span> 
            </div>
            <div>
              <input className={styles.input} type="email" name="email" 
                value={this.state.email}
                onChange={(e) => {this.setState({email: e.target.value})}}
              />
            </div>

            <div className={styles.formTitle}>
              <span className={styles.name}>Postcode</span> 
            </div>
            <div>
              <input className={styles.input} type="text" name="postcode"
                value={this.state.postcode}
                onChange={(e) => {this.setState({postcode: e.target.value})}}
              />
            </div>
            
            <div className={styles.formTitle}>
              <span className={styles.name}>Country</span> 
            </div>
            <div>
              <select className={styles.input} name="country"
                value={this.state.country}
                onChange={(e) => {this.setState({country: e.target.value})}}
              >
                <option value="">Select a country</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="US">🇺🇸 United States</option>
                <option value="AU">🇦🇺 Australia</option>
              </select>
            </div>

            <div className={styles.formTitle}>
              <span className={styles.name}>Address Line 1</span> 
            </div>
            <div>
              <textarea style={{height: 80, paddingTop: 10}} className={styles.input} type="text" name="address_1"
                value={this.state.address_1}
                onChange={(e) => {this.setState({address_1: e.target.value})}}
              />
            </div>

          </div>
        </div>
        <div className={styles.ft}>
          <div className={styles.btn} onClick={this.handleCheckout}>
            {
              this.state.requesting ?
              <Loading color="#fff" /> :
              <span>Continue to payment</span>
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

export default AddAddress