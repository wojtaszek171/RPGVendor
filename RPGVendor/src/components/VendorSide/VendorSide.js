import React, { Component } from 'react';
import  './VendorSide.scss';
import PropTypes from 'prop-types';
import { substractPlayerMoney, addPlayerMoney } from '../../database/simpleDatabase';
import VendorItemsGrid from '../VendorItemsGrid';
const JSONdb = window.require('simple-json-db');
const db = new JSONdb('database.json');

class VendorSide extends Component {

  static propTypes = {
    vendorId: PropTypes.string.isRequired,
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
        vendor,
        vendorId
    } = this.props
    
    return (
      <div className="VendorSideComponent">
          <div className="row">
            <span className="column">{vendor ? vendor.name : ''}'s Shop</span>
            <span className="column">Cash: {vendor ? vendor.cash : ''}</span>

          </div>
          <VendorItemsGrid vendorId={vendorId}/>
      </div>
    );
  }
}

export default VendorSide;
