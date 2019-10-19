import { connect } from "react-redux"
import ItemDescription from "./ItemDescription";
import itemDescriptionSelector from './itemDescriptionSelector'
import { updatePlayer } from '../../reducers/player'
import { updateVendors } from '../../reducers/vendors'

export default connect(
  itemDescriptionSelector,
  {
    updatePlayer,
    updateVendors
  }
)(ItemDescription)