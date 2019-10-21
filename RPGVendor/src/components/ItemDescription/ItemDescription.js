import React, { Component } from 'react'
import './ItemDescription.scss'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { sellItem, disassemblyItem, useConsumable } from '../../database/simpleDatabase'
import itemsIcons from '../../icons/itemsIcons'

class ItemDescription extends Component {

  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    itemAmount: PropTypes.number,
    
    item: PropTypes.object.isRequired,
    itemsById: PropTypes.object.isRequired,
    itemType: PropTypes.object.isRequired,
    vendorId: PropTypes.PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    vendorCash: PropTypes.number.isRequired,
    playerCash: PropTypes.number.isRequired,

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
    
    this.state = {
      sellSliderVal: 1,
      disassembly: false,
      vendorNotEnoughCash: false,
      playerNotEnoughCash: false
    }
    this.renderPlayerOptions = this.renderPlayerOptions.bind(this)
    this.handleSellItem = this.handleSellItem.bind(this)
    this.handleSlide = this.handleSlide.bind(this)
    this.handleDisassembly = this.handleDisassembly.bind(this)
    this.handleSubstractSell = this.handleSubstractSell.bind(this)
    this.handleAddSell = this.handleAddSell.bind(this)
    this.handleUseConsumable = this.handleUseConsumable.bind(this)
  }

  handleSellItem() {
    const {
      id,
      vendorId,
      updatePlayer,
      updateVendors,
      closeDescription
    } = this.props

    const {
      sellSliderVal
    } = this.state

    closeDescription()

    const result = sellItem(id, vendorId, Number(sellSliderVal))

    updatePlayer({
      data: result.playerNewData
    })

    updateVendors(
      vendorId,
      { data: result.vendorNewData }
    )
  }

  handleSlide(event) {
    const {
      vendorCash,
      item
    } = this.props

    const newVal = event.target.value

    if (vendorCash < item.sell*newVal) {
      this.setState({sellSliderVal: Math.floor(vendorCash/item.sell)});
    } else {
      this.setState({sellSliderVal: Number(event.target.value)});
    }
  }

  handleDisassembly() {
    const {
      id,
      updatePlayer
    } = this.props

    const {
      disassembly
    } = this.state

    if ( disassembly ) {
      updatePlayer({
        data: disassemblyItem(id, 1)
      })
      this.setState({disassembly: false})
    } else {
      this.setState({disassembly: true})    
    }
  }

  handleSubstractSell () {
    const {
      sellSliderVal
    } = this.state

    if (sellSliderVal > 1) {
      this.setState({ sellSliderVal: sellSliderVal - 1 });
    }
    return
  }

  handleAddSell () {
    const {
      item,
      itemAmount,
      vendorCash
    } = this.props
    const {
      sellSliderVal
    } = this.state

    if (vendorCash > item.sell*sellSliderVal && sellSliderVal < itemAmount) {
      this.setState({ sellSliderVal: sellSliderVal + 1 });
    }
    return
  }

  handleUseConsumable () {
    const {
      id,
      closeDescription,
      updatePlayer
    } = this.props

    closeDescription()

    updatePlayer({
      data: useConsumable(id)
    })
  }

  renderPlayerOptions() {
    const {
      itemAmount,
      item,
      itemType,
      itemsById,
      vendorCash
    } = this.props
      
    return itemType.id !== 4
    ?
      <div className="itemOptions">
        {itemType.id === 2 &&
          <div className="eatOption">
            <hr />
            <Button text={"USE CONSUMABLE"} onClick={this.handleUseConsumable} />
          </div>
        }
        <hr/>
        <span className="itemOptionTitle">Sell:</span>
        {itemAmount > 1 && <div className="slidecontainer">
          <Button text={"-"} onClick={this.handleSubstractSell}/><input type="range" min="1" step="1" max={itemAmount} value={this.state.sellSliderVal} className="slider" onChange={this.handleSlide} id="myRange"/><Button text={"+"} onClick={this.handleAddSell}/>
        </div>}
        {vendorCash >= item.sell*this.state.sellSliderVal ? 
          <React.Fragment><Button text={itemAmount > 1 ? 'SELL ('+ this.state.sellSliderVal +')' : 'SELL'} onClick={this.handleSellItem} />&nbsp;<span>Cash: {this.state.sellSliderVal ? '+'+this.state.sellSliderVal*item.sell : '+'+item.sell}</span></React.Fragment>
          : <span style={{ color: "red" }}>Vendor don't have enough cash</span>
        }
        {item.disassembly &&
          <div className="disassemblyOption">
            <hr />
            <span className="itemOptionTitle">Disassembly:</span>
            <div className="disassemblyOptionItems">
              {item.disassembly.map(item =>
                <div className="tooltip">
                  <div className="disassemblyOptionItem" >
                    <svg className="itemDescriptionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M0 0h512v512H0z" fill="url(#pattern)" fillOpacity="1"></path><g transform="translate(0,0)" ><path d={itemsIcons[item.id]} fill="#000" fillOpacity="1"></path></g></svg>
                    <span>&nbsp; x {item.amount}</span>
                  </div>
                  <span className="tooltiptext">{itemsById[item.id].name}</span>
                </div>
              )}
            </div>
            {this.state.disassembly ? <Button additionalStyle={{ color: 'red' }} text={'Confirm'} onClick={this.handleDisassembly} /> : <Button text={'DISASSEMBLY'} onClick={this.handleDisassembly} />}
          </div>
        }
      </div>
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
