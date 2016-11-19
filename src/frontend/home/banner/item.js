import React from 'react'
import styles from './banner.css'

const BannerItem = ({img, desc}) => (
  <div className={styles.inner}>
    <img 
      src={img} 
      alt={desc} 
      className="responsive" 
    />
    <p className={styles.text}>
      {desc}
    </p>
  </div>
)

export default BannerItem