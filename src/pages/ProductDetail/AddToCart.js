import React, { Component } from 'react'
import NavBar from '../common/NavBar'
import styles from './addToCart.css'

class AddToCartPage extends Component {
  
  // state = {}

  // shouldComponentUpdate(nextProps, nextState) {}

  // componentDidMount() {}

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className={styles.page}>
        <NavBar
          router={this.context.router}  
          back={'/list'}
          onClose={this.props.onClose}
        />

        <div className={styles.title}>add to cart</div>
        <div className={styles.ft}>
          <div className={styles.btn}>Confirm and pay $2,406.00</div>
        </div>         
        <div style={{height: 75}}></div>
      </div>
    )
  }
}

AddToCartPage.defaultProps = {}

AddToCartPage.propTypes = {}

export default AddToCartPage