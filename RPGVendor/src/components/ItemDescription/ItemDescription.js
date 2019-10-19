import React, { Component } from 'react'
import './ItemDescription.scss'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { sellItem } from '../../database/simpleDatabase'
import itemsIcons from '../../icons/itemsIcons'

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
          <hr/>
          <Button text={'SELL'} onClick={this.handleSellItem}/>
          <hr/>
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
        <div className="">
          <div className="">
            <svg className="itemDescriptionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M0 0h512v512H0z" fill="url(#pattern)" fillOpacity="1"></path><g transform="translate(0,0)" ><path d={itemsIcons[item.id]} fill="#000" fillOpacity="1"></path></g></svg>
          </div>
          <div className="descriptionList">
            <span>TYPE: </span><span>{itemType.name}</span>
            <span>STACKABLE: </span><span>{itemType.stackable ? 'yes' : 'no'}</span>
            {item.damage && <React.Fragment><span>DAMAGE: </span><span>{item.damage}</span></React.Fragment>}
            {item.requiredStrength && <React.Fragment><span>STRENGTH: </span><span>{item.requiredStrength}</span></React.Fragment>}
            {item.healing !== undefined && <React.Fragment><span>HEALING: </span><span>{item.healing}</span></React.Fragment>}
            {item.mana !== undefined && <React.Fragment><span>MANA BONUS: </span><span>{item.mana}</span></React.Fragment>}
            {item.buy && <React.Fragment><span>BUY: </span><span>{item.buy}</span></React.Fragment>}
            {item.sell && <React.Fragment><span>SELL: </span><span>{item.sell}</span></React.Fragment>}
          </div>
        </div>

        {(isVendor && selected) && this.renderVendorOptions()}
        {(!isVendor && selected) && this.renderPlayerOptions()}
      </div>
    )
  }
}

export default ItemDescription
