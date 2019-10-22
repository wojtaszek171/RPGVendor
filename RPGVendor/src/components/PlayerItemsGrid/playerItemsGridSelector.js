import { createSelector } from 'reselect'

const getSort = (state, props) => {
  return props.sort
}

const getPlayerInventoryItemsById = (state, props) => {
  return state.player.inventory.items
}

const getItemsById = (state, props) => {    
  return state.gameItems.itemsById
}

const getItemsTypesById = (state, props) => {  
  return state.gameItems.types
}

const getVendorId = (state, props) => {
  const action = state.action
  
  const vendorId = action.replace('vendor-', '')

  return vendorId  
}

const makePlayerIntentoryItemsSelector = createSelector(
  [getPlayerInventoryItemsById, getItemsById, getItemsTypesById],
  (playerInventoryItemsById, itemsById, itemsTypesById) => {
    if (playerInventoryItemsById) {
      return Object.keys(playerInventoryItemsById).reduce((acc, itemId) => {
        const playerInventoryItem = playerInventoryItemsById[itemId]
        const itemTypeId = itemsById[itemId].type
        const stackable = itemsTypesById[itemTypeId].stackable
        if (stackable || playerInventoryItem.amount === 1) {
          acc.push(playerInventoryItem)
        } else {
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

const makeSortedPlayerIntentoryItemsSelector = createSelector(
  [makePlayerIntentoryItemsSelector, getSort, getItemsById],
  (playerInventoryItems, sort, itemsById) => {   
    switch (Number(sort)) {
      case 0:
        return playerInventoryItems
      case 1:
        return playerInventoryItems.concat().sort(function compare(a, b) {
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
        return playerInventoryItems.concat().sort(function compare(a, b) {
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
    makeSortedPlayerIntentoryItemsSelector,
    getVendorId
  ],
  (
    playerInventoryItems,
    vendorId
  ) => {
    return {
      playerInventoryItems,
      vendorId
    }
  }
)
