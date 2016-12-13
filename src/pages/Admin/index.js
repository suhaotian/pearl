/* eslint-disable */
import React, { Component } from 'react'
import NavBar from '../common/NavBar'
import Fetch from 'components/Fetch'
import jump from 'jump.js'
import CategoryItem from './CategoryItem'
import styles from './style.css'

class ProductManage extends Component {

  componentDidMount() {
    jump(document.body, {duration: 0})
  }

  goCreate = (categoryID) => {
    this.props.router.transitionTo(`/admin/${categoryID}`)
  }

  goEdit = (productID) => {
    this.props.router.transitionTo(`/admin/edit/${productID}`) 
  }

  render() {
    return (
      <div>
        <NavBar
          router={this.props.router}  
        />
        <div className={styles.title}>Manage products</div>
        <Fetch url="categories">
          {
            (data) => {
              return (
                <div>
                  {
                    data.result.map(({id, title}) => (
                      <CategoryItem 
                        key={id}
                        id={id} 
                        title={title} 
                        handleAdd={this.goCreate.bind(this, id)}
                        handleEdit={this.goEdit}
                      />
                    ))
                  }
                </div>
              )
            }
          }
        </Fetch>
      </div>
    )
  }
}

export default ProductManage