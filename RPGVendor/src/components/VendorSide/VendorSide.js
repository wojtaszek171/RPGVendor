import React, { Component } from 'react'
import  './VendorSide.scss'
import PropTypes from 'prop-types'
import { substractPlayerMoney, addPlayerMoney } from '../../database/simpleDatabase'
import VendorItemsGrid from '../VendorItemsGrid'

class VendorSide extends Component {

  static propTypes = {
    vendor: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  
    this.state = {
      sort: 0 //0-default, 1-price, 2-type
    }
  }

  componentDidMount() {
    this.handleSelectChange = this.handleSelectChange.bind(this)   
  }

  handleSelectChange(e) {
    this.setState({ sort: e.target.value })
  }

  render() {
    const {
      vendor
    } = this.props

    return (
      <div className="VendorSideComponent">
        <div className="row">
          <span className="column">{vendor ? vendor.name : ''}'s Shop</span>
          <span className="column">Cash: {vendor ? vendor.cash : ''}</span>
        </div>
        <div className="row">
          <span className="sortSelect">
            Sort by &nbsp;
              <select onChange={this.handleSelectChange} value={this.state.sort}>
              <option value="0">
                default
                </option>
              <option value="1">
                item value
                </option>
              <option value="2">
                item type
                </option>
            </select>
          </span>
        </div>
        <VendorItemsGrid sort={this.state.sort}/>
      </div>
    );
  }
}

export default VendorSide;
