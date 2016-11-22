import React, { Component } from 'react'
import styles from './style.css'

export default class EditVariety extends Component {
  render() {
    return (
      <div className="mobile-page">
        <div className={styles.head}>
          Edit Variety
        </div>

        <div className={styles.wrap}>
          <div className={styles.field}>
            <div className={styles.title}>description</div>
            <input className={styles.input} value="1.00mm - 1.25mm " />
          </div>
          <div className={styles.field}>
            <div className={styles.title}>Price unit</div>

            <div className={styles.littleBtnWrap}>
              <div className={styles.littleBtn}>Kilogram</div>
              <div className={styles.littleBtn}>Pound</div>
              <div className={styles.littleBtn + ` ${styles.active}`}>Dozen</div>
              <div className={styles.littleBtn}>Piece</div>
            </div>
          </div>
          <div className={styles.fieldsWrap}>
            <div className={styles.fieldsWrapField}>
              <div className={styles.title}>Price</div>
              <input className={styles.input} value="$10.00 p/dozen" />
            </div>
            <div className={styles.fieldsWrapField}>
              <div className={styles.title}>Inventory</div>
              <input className={styles.input} value="500 dozen"/>
            </div>
          </div>
        </div>

      </div>
    )
  }
}