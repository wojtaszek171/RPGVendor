export const gameItems = (state = { types: {}, itemsById: {} }, action) => {
    switch (action.type) {
      case 'FETCH_GAME_ITEMS':
        return {
          ...state,
          ...action.payload.gameItems
        }
      default:
        return state
    }
}

export const fetchGameItems = (gameItems) => ({
    type: 'FETCH_GAME_ITEMS',
    payload: gameItems
});