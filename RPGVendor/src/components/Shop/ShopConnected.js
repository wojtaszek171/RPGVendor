import { connect } from "react-redux"
import Shop from "./Shop";

const mapStateToProps = (state) => {
    return {
      player: state.player
    }
};

export default connect(
  mapStateToProps,
  {

  }
)(Shop)