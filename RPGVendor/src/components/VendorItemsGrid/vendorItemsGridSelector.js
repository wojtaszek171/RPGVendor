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
        const playerInventoryItem = vendorInventoryItemsById[itemId]
        const itemTypeId = itemsById[itemId].type
        const stackable = itemsTypesById[itemTypeId].stackable
        if (playerInventoryItem.amount === 1) {
          acc.push(playerInventoryItem)
        } else if (stackable) {
          const stackSize = itemsTypesById[itemTypeId].stackSize
          const stacksNumber = Math.ceil(playerInventoryItem.amount/stackSize)
          for(let i=1; i<=stacksNumber; i++) {
            if (i===stacksNumber){
              acc.push({
                id: itemId,
                amount: playerInventoryItem.amount - (stacksNumber-1)*stackSize
              })
            } else {
              acc.push({
                id: itemId,
                amount: stackSize
              })
            }
          }
        }
        else {
          for(let i=0; i<playerInventoryItem.amount; i++) {
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
      case 1:
        return vendorIntentoryItems.concat().sort(function compare(a, b) {
          const valueA = itemsById[a.id].buy;
          const valueB = itemsById[b.id].buy;
        
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
      default:
          return vendorIntentoryItems
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
