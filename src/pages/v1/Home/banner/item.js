import React from 'react'
// import ResponsiveImage from 'components/ResponsiveImage'
import styles from './banner.css'

const BannerItem = ({img, desc}) => (
  <div 
    className={styles.inner} 
    style={{backgroundImage: `url(${img})`}}
  > 
    <p className={styles.text}>
      {desc}
    </p>
  </div>
)

export default BannerItem


/*
  <div className={styles.inner} >
    <ResponsiveImage src={img} ratio="42.6%">
      <p className={styles.text}>
        {desc}
      </p>
    </ResponsiveImage>    
  </div>
 */