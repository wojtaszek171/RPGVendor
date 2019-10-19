import { connect } from "react-redux"
import PlayerSide from "./PlayerSide";
import { updatePlayer } from "../../reducers/player"

const mapStateToProps = (state) => {    
    return {
      player: state.player,
    }
};

export default connect(
  mapStateToProps,
  {
    updatePlayer
  }
)(PlayerSide)