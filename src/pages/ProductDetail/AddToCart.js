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

        <p className={styles.info}>
          Kusshi Oyster <br/>
          1.50-1.75
        </p>

        <div className={styles.headTip}>quantity</div>
        <div className={styles.stepperWrap}>
          <div>20 dozen</div>
          <div className={styles.stepper}>
            <span className={styles.decrease}>-</span>
            <span className={styles.increase}>+</span>
          </div>
        </div>

        <div className={styles.headTip}>packaging</div>
        <div className={styles.package}>
          <div className={styles.packageItem}>Wax cardboard paper (20dz p/box)</div>
          <div className={styles.packageItem}>Enviro friendly paper (20dz p/box)</div>
          <div className={styles.packageItem + ' ' + styles.active}>
            <span>Wooden box (8dz p/box)</span>
            <span>+ 2.00 p/box</span>
          </div>
        </div>

        <div className={styles.ft}>
          <div className={styles.totalWrap}>
            <div className={styles.headTitle}>total</div>
            <div className={styles.price}>$802.00</div>
          </div>
          <div className={styles.halfBtn}>
            <div className={styles.btn} onClick={() => {
              this.props.router.transitionTo('/cart')
            }}>Add to cart</div>
          </div>
        </div>
        <div style={{height: 80}}></div>         
      </div>
    )
  }
}

AddToCartPage.defaultProps = {}

AddToCartPage.propTypes = {}

export default AddToCartPage