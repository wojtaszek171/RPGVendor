import { connect } from "react-redux"
import VendorItemsGrid from "./VendorItemsGrid";
import { updatePlayer } from "../../reducers/player"
import vendorItemsGridSelector from "./vendorItemsGridSelector"

export default connect(
  vendorItemsGridSelector,
  {
    updatePlayer
  }
)(VendorItemsGrid)