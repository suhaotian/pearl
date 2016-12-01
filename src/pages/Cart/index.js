import React, { Component, PropTypes } from 'react'
import NavBar from '../common/NavBar'
import TouchDelete from 'components/TouchDelete'
import currency from 'utils/currency'
import jump from 'jump.js'
import styles from './style.css'

const data = [
  {
    id: 1,
    name: 'Kusshi Oyster',
    money: 802,
    variety: '1.50-1.75',
    amount: 20,
    unit: 'dozen',
    package: 'Wooden box (20 dozen per box)',
  },
  {
    id: 2,
    name: 'Kusshi Oyster',
    money: 802,
    variety: '1.50-1.75',
    amount: 20,
    unit: 'dozen',
    package: 'Wooden box (20 dozen per box)',
  },
  {
    id: 3,
    name: 'Kusshi Oyster',
    money: 802,
    variety: '1.50-1.75',
    amount: 20,
    unit: 'dozen',
    package: 'Wooden box (20 dozen per box)',
  },
]


class Cart extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    data: data
  }

  total = 0

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {
    jump(document.body, {duration: 10})
  }

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}
  
  handleDelete = (id) => {
    this.total = 0
    const is = this.state.data.filter((item, i) => {
      return id !== item.id
    })
    this.setState({data: is})
  }

  render() {
    return (
      <div className={styles.wrap}>
        <NavBar
          router={this.context.router}  
          back={'/list'}
        />

        <div className={styles.title}>Shopping cart</div>

        <div className={styles.itemWrap}>
          {
            this.state.data.map((item, i) => {
              this.total = this.total + item.money
              return (
                <div key={item.id} className={styles.item}>
                  <TouchDelete len={-86}>
                    <div className={styles.rowWrap}>
                      <div className={styles.row1}>
                        <span className={styles.name}>{item.name} {i}</span>
                        <span className={styles.total}>{currency(item.money)}</span>
                      </div>
                      <div className={styles.row2}>
                        {item.variety} x {item.amount} {item.unit} <br/>
                        {item.package}
                      </div>              
                    </div>
                    <div 
                      className={styles.delete} 
                      onClick={this.handleDelete.bind(this, item.id)}
                    >delete</div>
                  </TouchDelete>
                </div>
              )
            })
          }          
        </div>

        <div className={styles.ft}>
          <div className={styles.btn}>Confirm and pay {currency(this.total)}</div>
        </div>         
        <div style={{height: 75}}></div>
      </div>
    )
  }
}


Cart.defaultProps = {}

Cart.propTypes = {}

export default Cart