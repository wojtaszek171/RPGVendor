import { createSelector } from 'reselect'

const getVendorInventoryItemsById = (state, props) => {  
  return state.vendors.vendorsById[props.vendorId] ? state.vendors.vendorsById[props.vendorId].items : {}
}

const getItemsById = (state, props) => {    
  return state.gameItems.itemsById
}

const getItemsTypesById = (state, props) => {  
  return state.gameItems.types
}

const makeVendorIntentoryItemsSelector = createSelector(
    [getVendorInventoryItemsById, getItemsById, getItemsTypesById],
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
