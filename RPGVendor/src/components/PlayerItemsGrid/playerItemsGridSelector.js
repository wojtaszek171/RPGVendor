import { createSelector } from 'reselect'

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

export default createSelector(
  [
    makePlayerIntentoryItemsSelector,
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
