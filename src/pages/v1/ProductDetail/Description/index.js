import React, { Component } from 'react'
import Hr from 'components/Hr'
import styles from './style.css'

export default class Description extends Component {

  render() {
    return (
      <div>
        <div className="page-padding">
          <h3 className={styles.title}>Kusshi Oyster</h3>
          <p className={styles.where}>
            Product of Canada <br/> In stock 
          </p>
        </div>
        <Hr style={{backgroundColor: '#eee'}} />
        <div className="page-padding">
          <p className={styles.text}>
            Kusshis are all the rage out West, due to their small size and ultra-clean flavor. 
            Kusshi, Japanese for “precious,” is almost as deep as it is long—just over two inches
            <span>…</span> 
            <span className={styles.readMore}>read more</span>
          </p>
        </div>
      </div>
    )
  }
}