import React, { Component } from 'react'
import  './Shop.scss'
import PropTypes from 'prop-types'
import TopBar from '../TopBar'
import PlayerSide from '../PlayerSide'
import VendorSide from '../VendorSide'

class Shop extends Component {

  static propTypes = {
    vendorId: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="ShopComponent">
        <TopBar/>
        <div className="row">
          <div className="column">
            <PlayerSide/>
          </div>
          <div className="columnSpace"></div>
          <div className="column">
            <VendorSide vendorId={this.props.vendorId}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Shop
