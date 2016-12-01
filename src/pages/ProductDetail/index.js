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
import styles from './style.css'

import commonStyles from '../common/style.css'

class ProductDetail extends Component {
  
  state = {
    current: 0,
    add: false,
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentWillMount() {
    
  }
  componentDidMount() {
    jump(document.body, {duration: 10})
  }

  // componentWillReceiveProps(nextProps) {}

  render() {
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

    let varietys = [
      {
        value: '1248.00-1.25',
        price: 4,
      },
      {
        value: '12.25-1.50',
        price: 6,
      },
      {
        value: '1.50-1.75',
        price: 8,
      },
      {
        value: '1.75-2.00',
        price: 10,
      },
      {
        value: '2.00-2.25',
        price: 12,
      },
    ]
    let {current} = this.state

    return (
      <div>
        <NavBar
          router={this.props.router}  
          title={'Pearl'}
          cart={true}
          back={'/list'}
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
          <div className={styles.name}>Kusshi Oyster</div>
          <div className={styles.where}>
            Product of Canada <br/>
            Live by Air
          </div>

          <div className={styles.description}>
            <TextExpand 
              text={"Still a rarity on East Coast menus, Kusshis are all the rage out West, due to their small size and ultra-clean flavor. Kusshis are grown in floating trays and this breaks off the thin growing edge and forces them to deepen and thicken their shells. edge and forces them to deepen and thicken their shells."}
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
              data={varietys}
              component="span" 
              className={styles.label} 
              activeClassName={styles.active}
              onChange={(v) => {
                this.setState({current:v})
              }}
            >
              {(item) => (item.value)}
            </SelectUtil>
          </div>
        </div>

        {
          this.state.add ? 
          <AddToCartPage name={'Kusshi Oyster'} data={varietys[this.state.current]} router={this.props.router} onClose={() => {this.setState({add: false})}}/> : (
          <div className={styles.ft}>
            <div className={styles.btn} onClick={() => {this.setState({add: true})}}>{currency(varietys[this.state.current].price)} per dozen</div>
          </div>         
          )
        }
        <div style={{height: 75}}></div>
      </div>
    )
  }
}

ProductDetail.defaultProps = {}

ProductDetail.propTypes = {}

export default ProductDetail