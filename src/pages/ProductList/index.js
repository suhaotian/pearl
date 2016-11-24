/* eslint-disable */ 
import React, { Component } from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import styles from './style.css'

export default class ProductList extends Component {

  render() {
    return (
      <div className="mobile-page">
        <div className={styles.head}>
          Your Products 
          <img src={require('./add.svg')} className={styles.add} />
        </div>

        <div>
          <div className={styles.item}>
            <div className={styles.itemLeft}>
              <ResponsiveImage ratio="63.5%" src={require('./img_1.jpg')}/>
            </div>
            <div>
              <div className={styles.itemTitle}>Kusshi Oyster</div>
              <div className={styles.itemStock}>In stock: 100 boxes</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLeft}>
              <ResponsiveImage ratio="63.5%" src={require('./img_2.jpg')}/>
            </div>
            <div>
              <div className={styles.itemTitle}>Pacific Urchin</div>
              <div className={styles.itemStock}>In stock: 10 boxes</div>
            </div>
          </div>
        </div>
        <div  className={styles.item}>
          <div className={styles.itemLeft}>
            <ResponsiveImage ratio="63.5%" />
          </div>
          <div className={styles.addList}>
            <img src={require('./add_black.svg')} className={styles.addListImg} />
            <span>Add new listing</span>
          </div>
        </div>
      </div>
    )
  }
}

