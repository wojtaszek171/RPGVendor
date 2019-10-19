export const action = (state = '', action) => {
    switch (action.type) {
      case 'FETCH_ACTION':
        return action.payload.action
      case 'UPDATE_ACTION':
        return action.payload.action
      default:
        return state
    }
}

export const fetchAction = (action) => ({
  type: 'FETCH_ACTION',
  payload: action
});

export const updatePlayer = (action) => ({
  type: 'UPDATE_ACTION',
  payload: action
});
