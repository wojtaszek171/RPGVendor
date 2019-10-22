import React, { Component } from 'react'
import './App.scss'
import Shop from '../Shop'
import { createDatabase, getPlayer, getVendors, getGameItems, getAction } from '../../database/simpleDatabase'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
      createDatabase().then(() => {
        this.props.playerFetched({ player: getPlayer()})
        this.props.fetchVendors({ vendorsById: getVendors() })
        this.props.fetchGameItems( { gameItems: getGameItems() })
        this.props.fetchAction( { action: getAction() } )

        this.setState({ loaded: true })
      })
  }

  componentDidUpdate() {
    
  }

  render() {
    return (
      <div className="App">
        {this.state.loaded && <Shop vendorId="1"/>}
      </div>
    );
  }
}

export default App;
