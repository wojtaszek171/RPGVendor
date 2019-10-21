import { createSelector } from 'reselect'

const getVendorId = (state, props) => {
  const action = state.action
  
  const vendorId = action.replace('vendor-', '')

  return vendorId  
}

const getVendorsById = (state, props) => {  
    return state.vendors.vendorsById
};

const makeVendorCashSelector = createSelector(
  [getVendorId, getVendorsById],
  (vendorId, vendorsById) => {    
    return vendorsById && vendorsById[vendorId]
  }
)


export default createSelector(
  [
    makeVendorCashSelector
  ],
  (
    vendor,
  ) => ({
    vendor
  })
)
