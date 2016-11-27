import React, { Component, PropTypes } from 'react'
import NavBar from '../common/NavBar'
import styles from './style.css'

class Cart extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {}

  // shouldComponentUpdate(nextProps, nextState) {}

  // componentDidMount() {}

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
        <NavBar
          router={this.context.router}  
          back={'/list'}
        />

        <div className={styles.title}>Shopping cart</div>
        <div className={styles.ft}>
          <div className={styles.btn}>Confirm and pay $2,406.00</div>
        </div>         
        <div style={{height: 75}}></div>
      </div>
    )
  }
}

Cart.defaultProps = {}

Cart.propTypes = {}

export default Cart