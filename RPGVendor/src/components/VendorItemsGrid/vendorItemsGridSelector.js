import { createSelector } from 'reselect'

const getSort = (state, props) => {
  return props.sort
}

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

const makeSortedVendorIntentoryItemsSelector = createSelector(
  [makeVendorIntentoryItemsSelector, getSort, getItemsById],
  (vendorIntentoryItems, sort, itemsById) => {   
    switch (Number(sort)) {
      case 0:
        return vendorIntentoryItems
      case 1:
        return vendorIntentoryItems.concat().sort(function compare(a, b) {
          const valueA = itemsById[a.id].sell;
          const valueB = itemsById[b.id].sell;
        
          let comparison = 0;
          if (valueA < valueB) {
            comparison = 1;
          } else if (valueA > valueB) {
            comparison = -1;
          }
          return comparison
        })        
      case 2:
        return vendorIntentoryItems.concat().sort(function compare(a, b) {
          const valueA = itemsById[a.id].type;
          const valueB = itemsById[b.id].type;
        
          let comparison = 0;
          if (valueA > valueB) {
            comparison = 1;
          } else if (valueA < valueB) {
            comparison = -1;
          }
          return comparison;
        })
    }
  }
)

export default createSelector(
  [
    makeSortedVendorIntentoryItemsSelector,
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
