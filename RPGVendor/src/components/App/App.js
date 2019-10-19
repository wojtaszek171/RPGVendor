import React, { Component } from 'react'
import './App.scss'
import Shop from '../Shop'
import { createDatabase, getPlayer, getVendors, getGameItems, getAction } from '../../database/simpleDatabase'

class App extends Component {

  componentDidMount() {
      createDatabase()
      
      this.props.playerFetched({ player: getPlayer()})
      this.props.fetchVendors({ vendorsById: getVendors() })
      this.props.fetchGameItems( { gameItems: getGameItems() })
      this.props.fetchAction( { action: getAction() } )
  }

  componentDidUpdate() {
    
  }

  render() {
    return (
      <div className="App">
        <Shop vendorId="1"/>
      </div>
    );
  }
}

export default App;
