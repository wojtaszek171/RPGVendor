import { connect } from "react-redux"
import PlayerItemsGrid from "./PlayerItemsGrid"
import { updatePlayer } from "../../reducers/player"
import playerItemsGridSelector from "./playerItemsGridSelector"

export default connect(
  playerItemsGridSelector,
  {
    updatePlayer
  }
)(PlayerItemsGrid)