import { createSelector } from 'reselect'

const getVendorId = (state, props) => {
  const action = state.action
  
  const vendorId = action.replace('vendor-', '')

  return vendorId  
}

const getVendorsById = (state, props) => {  
  return state.vendors.vendorsById
};

const makeVendorInventoryItemsByIdSelector = createSelector(
  [getVendorId, getVendorsById],
  (vendorId, vendorsById) => {
    return vendorsById[vendorId] && vendorsById[vendorId].items
  }
)

const getItemsById = (state, props) => {    
  return state.gameItems.itemsById
}

const getItemsTypesById = (state, props) => {  
  return state.gameItems.types
}

const makeVendorIntentoryItemsSelector = createSelector(
    [makeVendorInventoryItemsByIdSelector, getItemsById, getItemsTypesById],
    (vendorInventoryItemsById, itemsById, itemsTypesById) => {
      if (vendorInventoryItemsById) {
        return Object.keys(vendorInventoryItemsById).reduce((acc, itemId) => {
          const vendorInventoryItem = vendorInventoryItemsById[itemId]
          const itemTypeId = itemsById[itemId].type
          const stackable = itemsTypesById[itemTypeId].stackable
          if (stackable || vendorInventoryItem.amount === 1) {
            acc.push(vendorInventoryItem)
          } else {
            for(let i=0; i<vendorInventoryItem.amount; i++) {
              acc.push({
                id: itemId,
                amount: 1
              })
            }
          }          
          return acc
        }, [])
      } else {
        return []
      }
    }
)

export default createSelector(
  [
    makeVendorIntentoryItemsSelector,
    getItemsById,
    getItemsTypesById
  ],
  (
    vendorInventoryItems,
    itemsById,
    itemsTypesById
  ) => {
    return {
      vendorInventoryItems,
      itemsById,
      itemsTypesById
    }
  }
)
