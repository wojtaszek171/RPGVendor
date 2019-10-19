import { createSelector } from 'reselect'

const getItem = (state, props) => {    
  return state.gameItems.itemsById[props.id]
}

const getVendorId = (state, props) => {
  const action = state.action
  
  const vendorId = action.replace('vendor-', '')

  return vendorId  
}

const getItemsTypesById = (state, props) => {  
  return state.gameItems.types
}

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
    makeItemTypeSelector
  ],
  (
    item,
    vendorId,
    itemType
  ) => ({
    item,
    vendorId,
    itemType
  })
)
