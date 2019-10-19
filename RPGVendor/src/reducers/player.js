export const player = (state = { cash: 0, name: '', inventory: {}}, action) => {
    switch (action.type) {
      case 'FETCH_PLAYER':
        return {
          ...state,
          ...action.payload.player
        }
      case 'UPDATE_PLAYER':
        return {
          ...state,
          ...action.payload.data
        }
      default:
        return state
    }
}

export const playerFetched = (player) => ({
  type: 'FETCH_PLAYER',
  payload: player
});

export const updatePlayer = (data) => ({
  type: 'UPDATE_PLAYER',
  payload: data
});
