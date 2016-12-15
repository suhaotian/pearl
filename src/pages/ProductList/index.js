import React, { Component } from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import NavBar from '../common/NavBar'
import { GlobalLoading } from 'components/Loading'
import Link from 'react-router/Link'
import styles from './style.css'

import {m} from 'api/moltin'

class ProductList extends Component {

  state = {
    height: window.innerHeight,
    data: [],
    fetching: true,
    error: null,
  }

  componentDidMount() {
    m('Product.Search', {category: this.props.params.id})
      .then(res => {
        if (this.willUnmount) return
        let data = []
        for (var i = 0; i < res.length; i++) {
          if (res[i].packaging_id) {
            data.push(res[i])
          }
        }
        this.setState({
          fetching: false,
          data: data,
        }) 
      })
      .catch(e => {
        if (this.willUnmount) return
        this.setState({fetching: false, error: e.message})
      })

  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  render() {

    if (this.state.fetching) return <GlobalLoading />
    if (this.state.error) return <div>{this.state.error}</div>
    let {data, height} = this.state
    if (data.length < 1) return (
      <div className={styles.wrap} style={{minHeight: height}}>
        <NavBar
          router={this.props.router} 
          title={''}
          back={'/'}
          goTo={true}
          cart={true}
          noPadding={true}
        />
        <div style={{textAlign: 'center', padding: '20px'}}>Empty :(  <br/> please try another!</div>
      </div>
    )

    return (
      <div className={styles.wrap} style={{minHeight: height}}>
        <NavBar
          router={this.props.router} 
          title={data[0].category.value + 's'}
          back={'/'}
          goTo={true}
          cart={true}
          noPadding={true}
        />
        {
          data.map((item, i) => {
            return (
              <Link key={item.id} to={`/show/${this.props.params.id}/${item.id}`} className={styles.item}>
                <div className={styles.itemImg}>
                  <ResponsiveImage 
                    src={require('resources/images/oyster_show.png')}
                    ratio="88%"
                  />
                </div>
                <div className={styles.itemInfo}>
                  <h3>{item.title}</h3>
                  <div className={styles.status}>{item.stock_status.value}</div>
                  <div className={styles.itemPrice}>{item.price.value} {item.unit}</div>
                </div>
              </Link>
            )
          })
        }
      </div>
    )
  }
}

ProductList.defaultProps = {}

ProductList.propTypes = {}

export default ProductList