import { createSelector } from 'reselect'

const getVendor = (state, props) => {  
    return state.vendors.vendorsById[props.vendorId]
};

export default createSelector(
  [
    getVendor
  ],
  (
    vendor,
  ) => ({
    vendor
  })
)
