 /* eslint-disable */
 
import React, { Component } from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import StaticComponent from 'components/StaticComponent'
import SelectUtil from 'components/SelectUtil'
import jump from 'jump.js'
import Slider from 'react-slick'
import NavBar from '../common/NavBar'
import AddToCartPage from './AddToCart'
import TextExpand from 'components/TextExpand'
import currency from 'utils/currency'
import {m} from 'api/moltin'
import {GlobalLoading} from 'components/Loading'
import styles from './style.css'

import commonStyles from '../common/style.css'

class ProductDetail extends Component {
  
  state = {
    current: 0,
    add: false,
    data: '',
    variations: [],
    error: null,
    fetching: true,
  }

  componentDidMount() {
    jump(document.body, {duration: 10})
    m('Product.Get', this.props.params.id)
      .then(res => {
        if (this.willUnmount) return
        let product_variations = []
        for (let k in res.modifiers) {
          let modifier = res.modifiers[k]
          this.product_mid = modifier.id
          for (let k2 in modifier.variations) {
            let variation = modifier.variations[k2]
            product_variations.push({
              id: variation.id, type: variation.title, 
              stock: variation.stock_level || '', 
              price: parseFloat(variation.mod_price.replace('=', ''))
            })
          }
        }
        this.setState({
          fetching: false,
          data: res,
          variations: product_variations,
        })
      }).catch(e => {
        if (this.willUnmount) return
        this.setState({
          fetching: false,
          error: e.message || e.error || JSON.stringify(e)
        })
      })
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  render() {
    if (this.state.fetching) return <GlobalLoading />
    if (this.state.error) return <div style={{textAlign: 'center', padding: '20px'}}>{this.state.error}</div>

    let settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      arrows: false,
      className: styles.sliderWrap,
      slidesToScroll: 1,
    }
    let data = [
      {
        img:require('resources/images/oyster_detail.png'),
      },
      {
        img:require('resources/images/oyster_show.png'),
      },
    ]

    let {current} = this.state

    return (
      <div>
        <NavBar
          router={this.props.router}  
          title={'Pearl'}
          cart={true}
          back={`/list/${this.props.params.category_id}`}
          arrow={true}
        />
        <div ref={(c) => {this._el = c}}>
          <Slider {...settings}>
            {
              data.map((item, i) => (
                <div key={i}>
                  <StaticComponent>
                    <ResponsiveImage src={item.img} ratio="53.33%"/>
                  </StaticComponent>
                </div>
              ))
            }
          </Slider>  
        </div>

        <div className={styles.info}>
          <div className={styles.name}>{this.state.data.title}</div>
          <div className={styles.where}>
            Product of Canada <br/>
            Live by Air
          </div>

          <div className={styles.description}>
            <TextExpand 
              text={this.state.data.description}
              showLines={5}
              more={<span className={styles.more}>more</span>}
            />
          </div>
        </div>

        <div className={commonStyles.headTip}>variety</div>
        <div className={styles.labelWrap}>
          <div className={styles.labelInner}>
            <SelectUtil 
              current={current} 
              data={this.state.variations}
              component="span" 
              className={styles.label} 
              activeClassName={styles.active}
              onChange={(v) => {
                this.setState({current:v})
              }}
            >
              {(item) => (item.type)}
            </SelectUtil>
          </div>
        </div>

        {
          this.state.add ? 
          <AddToCartPage 
            data={this.state.data} 
            variation={this.state.variations[this.state.current]} 
            router={this.props.router} 
            modifier_id={this.product_mid}
            onClose={() => {
              this.setState({add: false})
            }}
          /> : (
          <div className={styles.ft}>
            <div 
              className={styles.btn} 
              onClick={() => {
                this.setState({add: true})
              }}
            > 
              {currency(this.state.variations[this.state.current].price)} per {this.state.data.unit}
            </div>
          </div>         
          )
        }
        <div style={{height: 150}}></div>
      </div>
    )
  }
}

ProductDetail.defaultProps = {}

ProductDetail.propTypes = {}

export default ProductDetail