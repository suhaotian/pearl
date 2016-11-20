import React from 'react'
import styles from './style.css'

const ResponsiveImage = ({
  src, ratio, children
}) => (
  <div
    className={styles.wrap}
    style={{paddingTop: ratio}}
  >
    <div
      className={styles.img}
      style={{backgroundImage: `url(${src})`}} 
    >
      {children}
    </div>
  </div>
)

export default ResponsiveImage