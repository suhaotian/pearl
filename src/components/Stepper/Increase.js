import React from 'react'
import styles from './style.css'

const Increase = ({children, ...props}) => (
  <span {...props} className={styles.increase}>{children}</span>
)

export default Increase