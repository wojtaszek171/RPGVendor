import { createSelector } from 'reselect'

const getItem = (state, props) => {    
  return state.gameItems.itemsById[props.id]
}

const getItemsById = (state, props) => {    
  return state.gameItems.itemsById
}

const getPlayerCash = (state, props) => {    
  return state.player.cash
}

const getVendorId = (state, props) => {
  const action = state.action
  
  const vendorId = action.replace('vendor-', '')

  return vendorId  
}

const getItemsTypesById = (state, props) => {  
  return state.gameItems.types
}

const getVendorsById = (state, props) => {
  return state.vendors.vendorsById
}

const makeVendorCashSelector = createSelector(
  [getVendorId, getVendorsById],
  (vendorId, vendorsById) => {    
    return vendorsById && vendorsById[vendorId].cash
  }
)

const makeItemTypeSelector = createSelector(
  [getItem, getItemsTypesById],
  (item, itemsTypesById) => {    
    return itemsTypesById ? itemsTypesById[item.type] : {}
  }
)

export default createSelector(
  [
    getItem,
    getVendorId,
    getItemsById,
    getPlayerCash,
    makeItemTypeSelector,
    makeVendorCashSelector
  ],
  (
    item,
    vendorId,
    itemsById,
    playerCash,
    itemType,
    vendorCash
  ) => ({
    item,
    vendorId,
    itemsById,
    playerCash,
    itemType,
    vendorCash
  })
)
