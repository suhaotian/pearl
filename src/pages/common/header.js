import React, { Component } from 'react'
import Link from 'react-router/Link'
import styles from './header.css'

export default class Header extends Component {

  render() {
    return (
      <div className="container">
        <div className={styles.wrap}>
          <Link to="/" className={styles.logo}>
            cool store
          </Link>

          <div>
            <Link 
              to="/login" 
              className={styles.link_btn}
            >
              login
            </Link>
            <button className={styles.primary_btn}>
              cart
            </button>
          </div>
        </div>        
      </div>
    )
  }
}