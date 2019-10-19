import React, { Component } from 'react'
import './ItemDescription.scss'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { sellItem } from '../../database/simpleDatabase'

class ItemDescription extends Component {

  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    item: PropTypes.object.isRequired,
    itemType: PropTypes.object.isRequired,
    vendorId: PropTypes.PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,

    isVendor: PropTypes.bool,
    selected: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    closeDescription: PropTypes.func.isRequired,

    updatePlayer: PropTypes.func.isRequired,
    updateVendors: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props)
    this.renderPlayerOptions = this.renderPlayerOptions.bind(this)
    this.handleSellItem = this.handleSellItem.bind(this)
  }

  handleSellItem() {
    const {
      id,
      vendorId,
      updatePlayer,
      updateVendors,
      closeDescription
    } = this.props

    closeDescription()

    const result = sellItem(id, vendorId, 1)

    updatePlayer({
      data: result.playerNewData
    })

    updateVendors(
      vendorId,
      { data: result.vendorNewData }
    )
  }

  renderPlayerOptions() {
    const {
      itemType
    } = this.props

      return itemType.id !== 4
      ?
        <React.Fragment>
          <Button text={'SELL'} onClick={this.handleSellItem}/>
          <Button text={'DISASSEMBLY'} onClick={() => console.log('Disassembly')}/>
        </React.Fragment>
      : 
        <p className="descriptionWarningText">Cannot sell or disassembly</p>
  }

  renderVendorOptions() {
    return ('vendorOptions')
  }

  render() {
    const {
      item,
      itemType,
      isVendor,
      selected
    } = this.props

    
    return (
      <div className="ItemDescriptionComponent">
        <p className="ItemDescriptionName">{item.name}</p>
        <ul>
          <li>TYPE: {itemType.name}</li>
          <li>STACKABLE: {itemType.stackable ? 'yes' : 'no'}</li>
          {item.damage && <li>DAMAGE: {item.damage}</li>}
          {item.requiredStrength && <li>REQUIRED STRENGTH: {item.requiredStrength}</li>}
          {item.healing !== undefined && <li>HEALING: {item.healing}</li>}
          {item.mana && <li>MANA BONUS: {item.mana}</li>}
          {item.buy && <li>BUY: {item.buy}</li>}
          {item.sell && <li>SELL: {item.sell}</li>}
        </ul>

        {(isVendor && selected) && this.renderVendorOptions()}
        {(!isVendor && selected) && this.renderPlayerOptions()}
      </div>
    )
  }
}

export default ItemDescription
