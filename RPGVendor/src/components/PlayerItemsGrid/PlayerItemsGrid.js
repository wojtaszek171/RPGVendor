import React, { Component } from 'react'
import  './PlayerItemsGrid.scss'
import PropTypes from 'prop-types'
import GridItem from './GridItem'
import ItemDescription from '../ItemDescription'

class PlayerItemsGrid extends Component {

  static propTypes = {
    playerInventoryItems: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      hoverId: null,
      showDescription: false,
      selectedId: false
    }
  }

  componentDidMount() {

    this.toggleHover = this.toggleHover.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleClickOutsideDescription = this.handleClickOutsideDescription.bind(this)
    this.handleCloseDescription = this.handleCloseDescription.bind(this)

    window.addEventListener('click', (e) => this.handleClickOutsideDescription(e), true);
  }

  componentWillUnmount() {
    window.removeEventListener('click', (e) => this.handleClickOutsideDescription(e), true);
  }

  toggleHover(itemId) {
    this.setState({ hoverId: itemId})
    this.hoverTimer=window.setTimeout(() => {
      this.setState({ showDescription: true })
    }, 1000);
  }

  toggleHoverLeave(itemId) {
    const {
      hoverId,
      showDescription
    } = this.state

    if (hoverId === itemId) {
      this.setState({ hoverId: null})
    }
    if (showDescription) {
      this.setState({ showDescription: false})
    }
    if (this.hoverTimer) window.clearTimeout(this.hoverTimer);
  }

  handleSelect(id) {
    this.setState({ selectedId: id })
  }

  handleClickOutsideDescription(e) {
    if (document.getElementById('descriptionId') && !document.getElementById('descriptionId').contains(e.target)){
      this.handleCloseDescription()
    }
  }

  handleCloseDescription() {
    this.setState({ selectedId: null })
  }

  render() {
    const {
      playerInventoryItems
    } = this.props

    return (
      <div className="PlayerItemsGridComponent">
        {playerInventoryItems && playerInventoryItems.map( (item, index) => 
          <div  className="GridItem" onMouseEnter={() => this.toggleHover(item.id)} onMouseLeave={() => this.toggleHoverLeave(item.id)} onClick={() => this.handleSelect(item.id)}>
            <GridItem key={"p"+index} counter={item.amount > 1 ? item.amount : null} itemId={item.id}/>
          </div>
        )}
        {(this.state.showDescription || this.state.selectedId) &&
        <div id="descriptionId" className="playerItemDescription">
          <ItemDescription
            id={this.state.selectedId || this.state.hoverId}
            selected={this.state.selectedId}
            closeDescription={this.handleCloseDescription}
          />
        </div>}
      </div>
    );
  }
}

export default PlayerItemsGrid
