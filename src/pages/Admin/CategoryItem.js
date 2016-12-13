/* eslint-disable */
import React, { Component } from 'react'
import styles from './style.css'
import TouchDelete from 'components/TouchDelete'
import Increase from 'components/Stepper/Increase'
import axios, {ajax, post} from 'api'
import Loading from 'components/Loading'

class CategoryItem extends Component {

  state = {
    fetching: true,
    data: null,
    error: null,
  }

  data = {}

  componentDidMount() {
    ajax().then(instance => {
      return instance.get(`products/search/?category=${this.props.id}`, {
        cancelToken: new axios.CancelToken((c) => {
          this.cancelFetch = c
        })
      })
    }).then(res => {
      let arr = [], result = res.data.result
      result.forEach((item, i) => {
        if (item.packaging_id) {
          arr.push(item)
          this.data[item.id] = {
            product: item,
          }
          result.splice(i, 1)
        } 
      })

      result.forEach((item, i) => {
        for (let k in this.data) {
          if (this.data[k]['product'].packaging_id === item.id) {
            this.data[k]['packaging'] = item
          }
        }
      })

      this.setState({
        fetching: false,
        data: arr,
      })
    })
    .catch(function(e) {
      if (!axios.isCancel(e)) {  
        this.setState({
          fetching: false,
          error: JSON.stringify(e),
        })
      } 
    })   
  }

  componentWillUnmount() {
    this.cancelFetch && this.cancelFetch()
  }

  render() {
    const {title, handleAdd, handleEdit, id} = this.props
    let tmpComponent = null

    if (this.state.fetching) {
      tmpComponent =  <Loading color="#222"/>
    } else if (this.state.error) {
      tmpComponent = <div>{this.state.error}</div>
    } else if (!this.state.data || this.state.data.length < 1) {
      tmpComponent = (
        <div className={styles.formInner}>
          <div className={styles.formItemContainer}>
            <div className={styles.formItemNone} onClick={handleAdd}>
              Add your first product
            </div>
          </div>
        </div> 
      )
    } else {
      tmpComponent = (
        <div className={styles.formInner}>
          {
            this.state.data.map(item => {
              return (
                <div 
                  key={item.id} 
                  className={styles.formItemContainer} 
                  onClick={() => {
                    localStorage.setItem('CURRENT_EDIT_PRODUCT_INFO', JSON.stringify(this.data[item.id]))
                    handleEdit(item.id)}
                  }
                >
                  <TouchDelete len={-68}>
                    <div className={styles.formItem}>
                      {item.title}
                      <div
                        className={styles.delete} 
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (confirm('Are you sure want to delete this product?')) {
                            this.setState({data: this.state.data.filter(items => items.id !== item.id)})
                            ajax().then(instance => {
                              instance.delete(`products/${item.id}`).then(res => {
                                if(!res.data.status) {
                                  console.log('product delete failed!')
                                }
                              })
                            })
                          }
                        }}
                      >delete</div>
                    </div>
                  </TouchDelete>
                </div>
              )
            })
          }
        </div>
      )
    }
    return (
      <div className={styles.formConainer}>
        <div className={styles.formTitle}>
          <span className={styles.name}>{title}</span> 
          <Increase onClick={handleAdd} style={{width: 15, height: 15}} />
        </div>
        {tmpComponent}
      </div>
    )
  }
}

export default CategoryItem
