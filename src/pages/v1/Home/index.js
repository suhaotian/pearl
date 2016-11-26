import React, { Component } from 'react'
import Header from '../common/header'
import Banner from './banner'
import List from './list'
import News from './news'
// import Footer from '../common/footer'
import Hr from 'components/Hr'
import styles from './index.css'

export default class Home extends Component {

  render() {
    return (
      <div className={styles.wrap}>
        <Header />
        <Banner />
        <List />

        <Hr />
        
        <News />
        {/*<Footer /> */}
      </div>
    )
  }

}