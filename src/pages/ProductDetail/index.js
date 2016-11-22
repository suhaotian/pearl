import React, { Component } from 'react'
import Banner from './Banner'
import Description from './Description'
import Hr from 'components/Hr'
import styles from './index.css'

export default class ProductDetail extends Component {
  componentDidMount() {
    document.body.scrollTop = 0
  }
  render() {
    return (
      <div className="mobile-page">
        <Banner />
        <Description />
        <Hr style={{backgroundColor: '#eee'}} />
        <div className="page-padding">
          <div className={styles.title}>Varieties</div>
          <div className={styles.item}>
            <span className={styles.itemRight}>1.00mm - 1.25mm</span>
            <span className={styles.itemRight}>$10.00 p/dz <div />500 dozen</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemRight}>1.00mm - 1.25mm</span>
            <span className={styles.itemRight}>$10.00 p/dz<div />500 dozen</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemRight}>1.00mm - 1.25mm</span>
            <span className={styles.itemRight}>$10.00 p/dz <div />500 dozen</span>
          </div>
        </div>

        <div className="page-padding">
          <div className={styles.title}>packaging</div>
          <div className={styles.item + ' ' + styles.active}>
            <span className={styles.itemLeft}>
              Wax cardbox box containing
              6 x dozen oysters per box
            </span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemLeft}>
              Environmentally friendly box
              6 x dozen oysters per box
            </span>

            <span>+ $25 p/box</span>
          </div>         
        </div>

        <div className="page-padding">
          <div className={styles.title}>Number of boxes</div>
          <div className={styles.add_sub_wrap}>
            <div className={styles.add}>
              <img src={require('./sub.svg')} />
            </div>
            <input className={styles.input} />
            <div className={styles.sub}>
              <img src={require('./plus.svg')} />
            </div>
          </div>
        </div>


        <div className={styles.footer}>
          <span className={styles.price}>$1,500.00</span>
          <button className={styles.btn}>Add to Cart</button>
        </div>

        <div style={{height: 120}} />
      </div>
    )

  }
}

