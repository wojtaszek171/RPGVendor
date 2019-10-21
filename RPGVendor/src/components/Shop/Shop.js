import React, { Component } from 'react'
import  './Shop.scss'
import PropTypes from 'prop-types'
import TopBar from '../TopBar'
import PlayerSide from '../PlayerSide'
import VendorSide from '../VendorSide'

class Shop extends Component {

  static propTypes = {
    vendorId: PropTypes.string.isRequired,

    player: PropTypes.object.isRequired
  }

  render() {
    const {
      player
    } = this.props

    console.log(player);
    
    return (
      <div className="ShopComponent">
        <TopBar/>
        <div className="row">
          <div className="column">
            <PlayerSide/>
          </div>
          <div className="columnSpace">
            <div className="descriptionList">
              <span>Hp:</span><span>{player.hp}/100</span>
              <span>Mana:</span><span>{player.mana}/100</span>
            </div>
          </div>
          <div className="column">
            <VendorSide vendorId={this.props.vendorId}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Shop
