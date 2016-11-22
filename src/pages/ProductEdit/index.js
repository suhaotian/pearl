import React, { Component } from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import styles from './style.css'
export default class ProductEdit extends Component {

  render() {
    return (
      <div className="mobile-page">
        <div className={styles.head}>
          Edit Kusshi Oyster
        </div>
        <div>
          <ResponsiveImage ratio="53.3%" src={require('./img_1.jpg')}>
            <div className={styles.mark}>
              <span className={styles.uploadIconWrap}>
                <img src={require('./upload.svg')} className={styles.uploadIcon}/> 
                <span>Add product photos</span>
              </span>
            </div>
          </ResponsiveImage>
        </div>

        <div className="page-padding">
          <div className={styles.title}>Edit varities, prices and inventory <img src={require('./add.svg')} /></div>
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
          <div className={styles.title}>Edit packaging <img src={require('./add.svg')} /></div>
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

        <div className={styles.footer}>
          <button className={styles.btn}>Save and preview changes</button>
        </div>

        <div style={{height: 120}} />
      </div>
    )
  }
}

