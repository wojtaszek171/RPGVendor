import React, { Component } from 'react';
import  './PlayerSide.scss';
import PropTypes from 'prop-types';
import { substractPlayerMoney, addPlayerMoney } from '../../database/simpleDatabase';
import ItemsGrid from '../VendorItemsGrid/VendorItemsGrid';
import PlayerItemsGrid from '../PlayerItemsGrid';
const JSONdb = window.require('simple-json-db');
const db = new JSONdb('database.json');

class PlayerSide extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired
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
        player
    } = this.props
    return (
      <div className="PlayerSideComponent">
          <div className="row">
            <span className="column">{player.name}</span>
            <span className="column">Cash: {player.cash}</span>
          </div>
          <PlayerItemsGrid/>
      </div>
    );
  }
}

export default PlayerSide;
