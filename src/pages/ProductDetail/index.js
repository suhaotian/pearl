import React, { Component } from 'react'
import Banner from './Banner'
import Description from './Description'
import Hr from 'components/Hr'
import InputNumber from 'components/InputNumber'
import currency from 'utils/currency'
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
            <span className={styles.itemLeft}>1.00mm - 1.25mm</span>
            <span className={styles.itemRight}>$10.00 p/dz <br />500 dozen</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemLeft}>1.00mm - 1.25mm</span>
            <span className={styles.itemRight}>$10.00 p/dz<br />500 dozen</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemLeft}>1.00mm - 1.25mm</span>
            <span className={styles.itemRight}>$10.00 p/dz <br />500 dozen</span>
          </div>
        </div>

        <div className="page-padding">
          <div className={styles.title}>packaging</div>
          <div className={styles.item + ' ' + styles.active}>
            <span className={styles.itemLeft}>
              Wax cardbox box containing 
              <br/>
              6 x dozen oysters per box
            </span>
            <span></span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemLeft}>
              Environmentally friendly box
              <br/>
              6 x dozen oysters per box
            </span>

            <span>+ $25 p/box</span>
          </div>         
        </div>

        <div className="page-padding">
          <div className={styles.title}>Number of boxes</div>
          <InputNumber 
            unit="box"
            units="boxes"
            value={2}
            onChange={(number) => {console.log(number)}}
          />
        </div>


        <div className={styles.footer}>
          <span className={styles.price}>
            {currency(1500)}
          </span>
          <button className={styles.btn}>Add to Cart</button>
        </div>

        <div style={{height: 120}} />
      </div>
    )

  }
}

