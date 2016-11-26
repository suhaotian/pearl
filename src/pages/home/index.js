import React, { Component, PropsType } from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import Link from 'react-router/Link'
import styles from './style.css'

class Home extends Component {
  
  // state = {}

  // shouldComponentUpdate(nextProps, nextState) {}

  // componentDidMount() {}

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}
  
  render() {
    return (
      <div>
        <div className={styles.head}>Pearl</div>
        <div className={styles.wrap}>
          <div className={styles.block}>
            <ResponsiveImage ratio="166%">
              <div className={styles.inner}>
                <div className={styles.title}>oysters</div>
                <div className={styles.imgWrap}>
                  {/*<img className={"responsive"} src={require('resources/images/oyster.png')} alt="oyster"/> */}
                  <ResponsiveImage src={require('resources/images/mussel.png')} ratio="69.1%" />
                </div>
                <div className={styles.btnWrap}>
                  <Link to="/list" className={styles.btn}>See stock</Link>
                </div>
              </div>
            </ResponsiveImage>
          </div>

          <div className={styles.dotWrap}>
            <div className={styles.dot}></div>
            <div className={styles.dot + ' ' + styles.active}></div>
            <div className={styles.dot}></div>
          </div>
          {/* 
          <div className={styles.block}>
            <ResponsiveImage ratio="166%">
              <div className={styles.inner}>
                <div className={styles.title}>oyster</div>
                <div className={styles.imgWrap}>
                  <ResponsiveImage src={require('resources/images/oyster.png')} ratio="69.1%" />
                </div>
                <Link to="/list" className={styles.btn}>See stock</Link>
              </div>
            </ResponsiveImage>
          </div>
          */}
        </div>
      </div>
    )
  }
}

Home.defaultProps = {}

Home.propTypes = {}

export default Home