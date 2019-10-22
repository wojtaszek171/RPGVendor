import React, { Component } from 'react'
import  './PlayerSide.scss'
import PropTypes from 'prop-types'
import PlayerItemsGrid from '../PlayerItemsGrid'

class PlayerSide extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  
    this.state = {
      sort: 2 //2-default, 1-price, 2-type
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
        player
    } = this.props
    return (
      <div className="PlayerSideComponent">
          <div className="row">
            <span className="column">{player.name}</span>
            <span className="column">Cash: {player.cash}</span>
          </div>
          <div className="row">
            <span className="sortSelect">
              Sort by &nbsp;
              <select onChange={this.handleSelectChange} value={this.state.sort}>
                <option value="2">
                  item type
                </option>
                <option value="1">
                  item value
                </option>
              </select>
            </span>
          </div>
          <PlayerItemsGrid sort={this.state.sort}/>
      </div>
    );
  }
}

export default PlayerSide
