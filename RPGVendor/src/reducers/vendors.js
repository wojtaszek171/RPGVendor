export const vendors = (state = { vendorsById: {} }, action) => {
    switch (action.type) {
      case 'FETCH_VENDOR':        
        return {
          ...state,
          vendorsById: action.payload.vendorsById
        }
      case 'UPDATE_VENDORS':            
        return {
          vendorsById: {
            ...state.vendorsById,
            [action.vendorId]: {
              ...state.vendorsById[action.vendorId],
              ...action.payload.data
            }
          }
        }
      default:
        return state
    }
}

export const fetchVendors = (vendors) => ({
  type: 'FETCH_VENDOR',
  payload: vendors
});

export const updateVendors = (vendorId, data) => ({
  type: 'UPDATE_VENDORS',
  vendorId,
  payload: data
});
