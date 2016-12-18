import React, { Component, PropTypes } from 'react'
import NavBar from '../common/NavBar'
import Loading, {GlobalLoading} from 'components/Loading'
import validate from './address_validate'
import styles from './style.css'

class AddAddress extends Component {
  // static defaultProps = {}

  // static propTypes = {}

  state = {
    requesting: false,
  }

  // componentDidMount() {}

  // componentWillUnmount() {}

  render() {
    return (
      <div>
        <NavBar
          router={this.context.router}  
          back={'/'}
        />

        <div className={styles.title}>Billing address</div>

        <div className={styles.container}>
          <div>
            <div className={styles.formTitle} style={{marginTop: 0}}>
              <span className={styles.name}>First Name</span> 
            </div>
            <div>
              <input className={styles.input} type="text" name="first_name"/>
            </div>

            <div className={styles.formTitle}>
              <span className={styles.name}>Last Name</span> 
            </div>
            <div>
              <input className={styles.input} type="text" name="last_name"/>
            </div>

            <div className={styles.formTitle}>
              <span className={styles.name}>Phone</span> 
            </div>
            <div>
              <input className={styles.input} type="tel" name="phone" />
            </div>

           <div className={styles.formTitle}>
              <span className={styles.name}>Postcode</span> 
            </div>
            <div>
              <input className={styles.input} type="text" name="postcode"/>
            </div>
            
            <div className={styles.formTitle}>
              <span className={styles.name}>Country</span> 
            </div>
            <div>
              <select className={styles.input} name="country">
                <option value="-1">Select a country</option>
                <option value="0">🇬🇧 United Kingdom</option>
                <option value="1">🇺🇸 America</option>
                <option value="2">🇦🇺 Australia</option>
              </select>
            </div>

            <div className={styles.formTitle}>
              <span className={styles.name}>Address Line</span> 
            </div>
            <div>
              <input className={styles.input} type="text" name="address"/>
            </div>
          </div>
        </div>
        <div className={styles.ft}>
          <div className={styles.btn} onClick={() => {
            this.props.router.transitionTo('/cart/payment')
          }}>
            {
              this.state.requesting ?
              <Loading color="#fff" /> :
              <span>Continue to payment</span>
            }
          </div>
        </div>
        <div style={{height: 80}}></div>
      </div>
    )
  }
}

export default AddAddress