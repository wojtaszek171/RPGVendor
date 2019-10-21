import React, { Component } from 'react'
import  './VendorSide.scss'
import PropTypes from 'prop-types'
import { substractPlayerMoney, addPlayerMoney } from '../../database/simpleDatabase'
import VendorItemsGrid from '../VendorItemsGrid'

class VendorSide extends Component {

  static propTypes = {
    vendor: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.addMoney = this.addMoney.bind(this)
    this.substractMoney = this.substractMoney.bind(this)    
  }

  componentDidUpdate() {
       
  }

  addMoney() {
    this.props.updatePlayer({ data: addPlayerMoney(20) });
  }

  substractMoney() {
    this.props.updatePlayer({ data: substractPlayerMoney(20) });
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
          <VendorItemsGrid/>
      </div>
    );
  }
}

export default VendorSide;
