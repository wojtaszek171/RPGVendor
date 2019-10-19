import { connect } from "react-redux"
import TopBar from "./TopBar";
import { updatePlayer } from "../../reducers/player"

export default connect(
  null,
  {
    updatePlayer
  }
)(TopBar)