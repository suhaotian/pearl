import React from 'react'
import ResponsiveImage from 'components/ResponsiveImage'

import styles from './list.css'

const Item = ({name, desc, price, unit, img}) => (
  <div className={styles.item}>
    <div className={styles.card}>
      <ResponsiveImage 
        ratio="62.5%"
        src={img}
        className={'stest'}
      />
      <div className={styles.bd}>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.desc}>{desc}</p>
        </div>

        <div className={styles.ft}>
          <span className={styles.price}>{price} {unit}</span>
          <button className={styles.ghost_btn}>buy</button>
        </div>
      </div>
    </div>
  </div>
)

export default Item