import React, { Component } from 'react'
import NavBar from '../common/NavBar'
import styles from './addToCart.css'

class AddToCartPage extends Component {
  
  // state = {}

  // shouldComponentUpdate(nextProps, nextState) {}

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
          <div className={styles.totalWrap}>
            <div className={styles.headTip}>total</div>
            <div className={styles.price}>$802.00</div>
          </div>
          <div className={styles.halfBtn}>
            <div className={styles.btn}>Add to cart</div>
          </div>
        </div>         
      </div>
    )
  }
}

AddToCartPage.defaultProps = {}

AddToCartPage.propTypes = {}

export default AddToCartPage