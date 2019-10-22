import React, { Component } from 'react'
import  './VendorItemsGrid.scss'
import PropTypes from 'prop-types'
import GridItem from './GridItem'
import ItemDescription from '../ItemDescription'

class VendorItemsGrid extends Component {

  static propTypes = {
    sort: PropTypes.PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    vendorInventoryItems: PropTypes.array.isRequired,
    vendorId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
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
    }, 300);
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

  handleSelect(item) {
    this.setState({ selectedId: item.id, selectedAmount: item.amount })
  }
  
  handleClickOutsideDescription(e) {
    if (document.getElementById('descriptionId') && !document.getElementById('descriptionId').contains(e.target)){
      this.setState({ selectedId: null })
    }
  }

  handleCloseDescription() {
    this.setState({ selectedId: null, selectedAmount: null })
  }

  render() {
    const {
      vendorInventoryItems
    } = this.props
    return (
      <div className="VendorItemsGridComponent">
        {vendorInventoryItems && vendorInventoryItems.map( (item, index) => 
          <div className="GridItem" onMouseEnter={() => this.toggleHover(item.id)} onMouseLeave={() => this.toggleHoverLeave(item.id)}  onClick={() => this.handleSelect(item)}>
            <GridItem key={"v"+index} counter={item.amount > 1 ? item.amount : null} itemId={item.id}/>
          </div>
        )}
        {(this.state.showDescription || this.state.selectedId) && 
          <div id="descriptionId"  className="vendorItemDescription">
            <ItemDescription 
              id={this.state.selectedId || this.state.hoverId}
              selected={this.state.selectedId}
              itemAmount={this.state.selectedAmount}
              isVendor={true}
              closeDescription={this.handleCloseDescription}/>
          </div>}
      </div>
    );
  }
}

export default VendorItemsGrid;
