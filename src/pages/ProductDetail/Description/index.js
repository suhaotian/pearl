import React, { Component } from 'react'
import styles from './style.css'

export default class Description extends Component {

  render() {
    return (
      <div>
        <h3 className={styles.title}>Kusshi Oyster</h3>
        <p className={styles.where}>
          Product of Canada <br/> In stock 
        </p>
        <p className={styles.text}>
          Kusshis are all the rage out West, due to their small size and ultra-clean flavor. 
          Kusshi, Japanese for “precious,” is almost as deep as it is long—just over two inches… 
          <span className={styles.readMore}>read more</span>
        </p>
      </div>
    )
  }
}