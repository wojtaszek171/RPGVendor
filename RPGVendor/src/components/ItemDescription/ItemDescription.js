import React, { Component } from 'react'
import './ItemDescription.scss'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { sellItem, disassemblyItem, useConsumable, buyItem } from '../../database/simpleDatabase'
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
    vendorCost: PropTypes.number.isRequired,
    playerCost: PropTypes.number.isRequired,

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
      sliderVal: 1,
      disassembly: false,
      vendorNotEnoughCost: false,
      playerNotEnoughCost: false
    }
    this.renderPlayerOptions = this.renderPlayerOptions.bind(this)
    this.handleSellItem = this.handleSellItem.bind(this)
    this.handleBuyItem = this.handleBuyItem.bind(this)
    this.handleSlide = this.handleSlide.bind(this)
    this.handleDisassembly = this.handleDisassembly.bind(this)
    this.handleSubstractSell = this.handleSubstractSell.bind(this)
    this.handleAddSell = this.handleAddSell.bind(this)
    this.handleSubstractBuy = this.handleSubstractBuy.bind(this)
    this.handleAddBuy = this.handleAddBuy.bind(this)
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
      sliderVal
    } = this.state

    closeDescription()

    const result = sellItem(id, vendorId, Number(sliderVal))

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
      playerCash,
      item,
      isVendor
    } = this.props

    const newVal = event.target.value

    if (isVendor) {
      if (playerCash < item.buy*newVal) {
        this.setState({sliderVal: Math.floor(playerCash/item.buy)});
      } else {
        this.setState({sliderVal: Number(event.target.value)});
      }
    } else {
      if (vendorCash < item.sell*newVal) {
        this.setState({sliderVal: Math.floor(vendorCash/item.sell)});
      } else {
        this.setState({sliderVal: Number(event.target.value)});
      }
    }
  }

  handleDisassembly() {
    const {
      id,
      updatePlayer,
      closeDescription
    } = this.props

    const {
      disassembly
    } = this.state

    if ( disassembly ) {
      updatePlayer({
        data: disassemblyItem(id, 1)
      })
      closeDescription()
      this.setState({disassembly: false})
    } else {
      this.setState({disassembly: true})    
    }
  }

  handleSubstractSell () {
    const {
      sliderVal
    } = this.state

    if (sliderVal > 1) {
      this.setState({ sliderVal: sliderVal - 1 });
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
      sliderVal
    } = this.state

    if (vendorCash > item.sell*sliderVal && sliderVal < itemAmount) {
      this.setState({ sliderVal: sliderVal + 1 });
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
        <hr />
        <span className="itemOptionTitle">Sell:</span>
        {itemAmount > 1 && <div className="slidecontainer">
          <Button text={"-"} onClick={this.handleSubstractSell} /><input type="range" min="1" step="1" max={itemAmount} value={this.state.sliderVal} className="slider" onChange={this.handleSlide} id="myRange" /><Button text={"+"} onClick={this.handleAddSell} />
        </div>}
        {vendorCash >= item.sell * this.state.sliderVal ?
          <React.Fragment><Button text={itemAmount > 1 ? 'SELL (' + this.state.sliderVal + ')' : 'SELL'} onClick={this.handleSellItem} />&nbsp;<span>Gain: {this.state.sliderVal ? this.state.sliderVal * item.sell : item.sell}</span></React.Fragment>
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

  handleSubstractBuy () {
    const {
      sliderVal
    } = this.state

    if (sliderVal > 1) {
      this.setState({ sliderVal: sliderVal - 1 });
    }
    return
  }

  handleAddBuy () {
    const {
      item,
      itemAmount,
      playerCash
    } = this.props
    const {
      sliderVal
    } = this.state

    if (playerCash > item.buy*sliderVal && sliderVal < itemAmount) {
      this.setState({ sliderVal: sliderVal + 1 });
    }
    return
  }

  handleBuyItem() {
    const {
      id,
      vendorId,
      updatePlayer,
      updateVendors,
      closeDescription
    } = this.props

    const {
      sliderVal
    } = this.state

    closeDescription()

    const result = buyItem(id, vendorId, Number(sliderVal))

    updatePlayer({
      data: result.playerNewData
    })

    updateVendors(
      vendorId,
      { data: result.vendorNewData }
    )
  }

  renderVendorOptions() {
    const {
      itemAmount,
      item,
      playerCash
    } = this.props

    return (
      <div className="itemOptions">
        <hr />
        <span className="itemOptionTitle">Buy:</span>
        {itemAmount > 1 && <div className="slidecontainer">
          <Button text={"-"} onClick={this.handleSubstractBuy} /><input type="range" min="1" step="1" max={itemAmount} value={this.state.sliderVal} className="slider" onChange={this.handleSlide} id="myRange" /><Button text={"+"} onClick={this.handleAddBuy} />
        </div>}
        {playerCash >= item.buy * this.state.sliderVal ?
          <React.Fragment><Button text={itemAmount > 1 ? 'Buy (' + this.state.sliderVal + ')' : 'Buy'} onClick={this.handleBuyItem} />&nbsp;<span>Cost: {this.state.sliderVal ? this.state.sliderVal * item.buy : item.buy}</span></React.Fragment>
          : <span style={{ color: "red" }}>You don't have enough cash</span>
        }
      </div>
    )
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
            <span>STACKABLE: </span><span>{itemType.stackable ? 'yes('+ itemType.stackSize +')': 'no'}</span>
            {item.damage && <React.Fragment><span>DAMAGE: </span><span>{item.damage}</span></React.Fragment>}
            {item.requiredStrength && <React.Fragment><span>STRENGTH: </span><span>{item.requiredStrength}</span></React.Fragment>}
            {item.healing !== undefined && <React.Fragment><span>HEALING: </span><span>{item.healing}</span></React.Fragment>}
            {item.mana !== undefined && <React.Fragment><span>MANA BONUS: </span><span>{item.mana}</span></React.Fragment>}
            {isVendor && <React.Fragment><span>VALUE: </span><span>{item.buy}</span></React.Fragment>}
            {(!isVendor && item.sell) && <React.Fragment><span>VALUE: </span><span>{item.sell}</span></React.Fragment>}
          </div>
        </div>

        {(isVendor && selected) && this.renderVendorOptions()}
        {(!isVendor && selected) && this.renderPlayerOptions()}
      </div>
    )
  }
}

export default ItemDescription
