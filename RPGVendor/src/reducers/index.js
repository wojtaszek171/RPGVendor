import { combineReducers } from "redux"
import { player } from "./player"
import { action } from "./action"
import { vendors } from "./vendors"
import { gameItems } from "./gameItems"

export default combineReducers({
    action,
    player,
    vendors,
    gameItems
});