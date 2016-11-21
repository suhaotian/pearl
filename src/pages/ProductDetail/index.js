import React, { Component } from 'react'
import Banner from './Banner'
import Description from './Description'
import styles from './index.css'

export default class ProductDetail extends Component {

  render() {
    return (
      <div className="mobile-page">
        <Banner />
        <Description />
        <div>
          <div className={styles.title}>Varieties</div>
          <div className={styles.item}>
            1.00mm - 1.25mm
            $10.00 p/dz
          </div>
          <div className={styles.item}>
            1.25mm - 1.50mm
            $11.00 p/dz
          </div>
          <div className={styles.item}>
            1.50mm - 1.75mm
            $11.00 p/dz
          </div>
        </div>

        <div>
          <div className={styles.title}>packaging</div>
          <div className={styles.item + ' ' + styles.active}>
            Wax cardbox box containing
            6 x dozen oysters per box
          </div>
          <div className={styles.item}>
            Environmentally friendly box
            6 x dozen oysters per box

            + $25 p/box
          </div>         
        </div>

        <div>
          <div className={styles.title}>Number of boxes</div>
          <div className={styles.add_sub_wrap}>
            <div className={styles.add}>-</div>
            <input className={styles.input} />
            <div className={styles.sub}>+</div>
          </div>
        </div>


        <div className={styles.footer}>
          <span className={styles.price}>$1500</span>
          <button className={styles.btn}>Add to Cart</button>
        </div>

        {/*<pre>{JSON.stringify(this.props, null, 2)}</pre> */}

        <div style={{height: 80}} />
      </div>
    )

  }
}

