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
      <div className={styles.wrap}>
        <NavBar
          router={this.context.router}  
          back={'/list'}
        />

        <div className={styles.title}>Shopping cart</div>

        <div className={styles.itemWrap}>

          <div className={styles.item}>
            <div className={styles.rowWrap}>
            <div className={styles.row1}>
              <span className={styles.name}>Kusshi Oyster</span>
              <span className={styles.total}>$802.00</span>
            </div>
            <div className={styles.row2}>
              1.50 - 1.75 x 20 dozen <br/>
              Wooden box (20 dozen per box)
            </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.rowWrap}>
            <div className={styles.row1}>
              <span className={styles.name}>Kusshi Oyster</span>
              <span className={styles.total}>$802.00</span>
            </div>
            <div className={styles.row2}>
              1.50 - 1.75 x 20 dozen <br/>
              Wooden box (20 dozen per box)
            </div>
            </div>
          </div>
          <div className={styles.item} style={{transform: `translateX(0)`}}>
            <div className={styles.rowWrap}>
              <div className={styles.row1}>
                <span className={styles.name}>Kusshi Oyster</span>
                <span className={styles.total}>$802.00</span>
              </div>
              <div className={styles.row2}>
                1.50 - 1.75 x 20 dozen <br/>
                Wooden box (20 dozen per box)
              </div>              
            </div>

            <div className={styles.delete}>delete</div>
          </div>
        </div>

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