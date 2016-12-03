import React, { Component, PropTypes } from 'react'
import styles from './style.css'
import TouchDelete from 'components/TouchDelete'
import NavBar from '../common/NavBar'
import Increase from 'components/Stepper/Increase'
import jump from 'jump.js'

class ProductManage extends Component {
  // static defaultProps = {}

  // static propTypes = {}

  state = {
    oysters: [
      {id: 0, name: 'Kusshi Oyster'}
    ]
  }

  handleDelete = (id, field) => {
    const newState = this.state[field].filter((item) => (item.id !== id))
    this.setState((prevState) => {
      prevState[field] = newState
      return prevState
    })
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {
    jump(document.body, {duration: 10})
  }

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}
  // 
  goCreate = () => {
    this.props.router.transitionTo('/admin/form')
  }

  render() {
    return (
      <div>
        <NavBar
          router={this.props.router}  
        />
        <div className={styles.title}>Manage products</div>


        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>oyster</span> 
            <Increase 
            onClick={this.goCreate} 
            style={{width: 15, height: 15}} />
          </div>
          <div className={styles.formInner}>
              { 
                this.state.oysters.length > 0 ?
                this.state.oysters.map((item, i) => (
                  <div key={item.id} className={styles.formItemContainer}>
                    <TouchDelete len={-68}>
                      <div className={styles.formItem}>
                        {item.name}

                        <div
                          className={styles.delete} 
                          onClick={() => {
                            this.handleDelete(item.id, 'oysters')
                          }}
                        >delete</div>
                      </div>
                    </TouchDelete>
                  </div>
                )) :
                <div className={styles.formItemContainer}>
                    <div onClick={this.goCreate} className={styles.formItemNone}>
                      Add your first product
                    </div>
                </div>
              }
          </div>
        </div>
        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>mussel</span> 
            <Increase onClick={this.goCreate} style={{width: 15, height: 15}} />
          </div>
          <div className={styles.formInner}>
              <div className={styles.formItemContainer}>
                  <div onClick={this.goCreate} className={styles.formItemNone}>
                    Add your first product
                  </div>
              </div>
          </div>
        </div>

        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>crab</span> 
            <Increase onClick={this.goCreate} style={{width: 15, height: 15}} />
          </div>
          <div className={styles.formInner}>
              <div className={styles.formItemContainer}>
                  <div onClick={this.goCreate} className={styles.formItemNone}>
                    Add your first product
                  </div>
              </div>
          </div>
        </div>


        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>lobster</span> 
            <Increase onClick={this.goCreate} style={{width: 15, height: 15}} />
          </div>
          <div className={styles.formInner}>
              <div className={styles.formItemContainer}>
                  <div onClick={this.goCreate} className={styles.formItemNone}>
                    Add your first product
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductManage