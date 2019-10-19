import { connect } from "react-redux"
import { playerFetched } from "../../reducers/player"
import { fetchAction } from "../../reducers/action"
import { fetchGameItems } from "../../reducers/gameItems"
import { fetchVendors } from "../../reducers/vendors"
import App from "./App";

const mapStateToProps = (state) => {
    return {
      player: state.player,
      gameItems: state.gameItems,
      vendor: state.vendor
    }
};

export default connect(
  mapStateToProps,
  {
    playerFetched,
    fetchAction,
    fetchGameItems,
    fetchVendors
  }
)(App)