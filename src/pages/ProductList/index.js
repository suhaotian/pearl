import React, { Component, PropTypes } from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import NavBar from '../common/NavBar'
import { GlobalLoading } from 'components/Loading'
import Link from 'react-router/Link'
import styles from './style.css'

import mock from 'utils/mock'
import data from './data'


class ProductList extends Component {
  
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    height: window.innerHeight,
    data: []
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {
    mock(data, 1000).then((data) => {
      if (this.willUnmount) return
      this.setState({data})
    })
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  // componentWillReceiveProps(nextProps) {}

  render() {
    let {data, height} = this.state

    return (
      <div>
        {data.length === 0 ? <GlobalLoading /> : (
          <div className={styles.wrap} style={{minHeight: height}}>
            <NavBar
              router={this.context.router} 
              title={'oysters'}
              back={'/'}
              cart={true}
              noPadding={true}
            />
            {
              data.map((item, i) => {
                let active = ` ${styles.outStock}`
                let text = 'out of stock'
                if (item.stock) {
                  text = 'in stock'
                  active = ''
                }
                return (
                  <Link key={item.id || i} to={`/show/${item.id || i}`} className={styles.item}>
                    <div className={styles.itemImg + active}>
                      <ResponsiveImage 
                        src={item.img}
                        ratio="88%"
                      />
                    </div>
                    <div className={styles.itemInfo}>
                      <h3>{item.name}</h3>
                      <div className={styles.status}>{text}</div>
                      <div className={styles.itemPrice}>{item.price}</div>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        )}
      </div>
    )
  }
}

ProductList.defaultProps = {}

ProductList.propTypes = {}

export default ProductList