import React from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import Link from 'react-router/Link'

import styles from './list.css'

const Item = ({name, desc, price, unit, img, id}) => (
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
          <Link to={`/detail/${id}`}><button className={styles.ghost_btn}>buy</button></Link>
        </div>
      </div>
    </div>
  </div>
)

export default Item