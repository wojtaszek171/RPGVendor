import { connect } from "react-redux"
import { updateVendors } from "../../reducers/vendors"
import VendorSide from "./VendorSide";
import vendorSideSelector from "./vendorSideSelector"

export default connect(
  vendorSideSelector,
  {
    updateVendors
  }
)(VendorSide)