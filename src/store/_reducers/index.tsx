import { combineReducers} from "redux";
import teams from "./teams";
import users from "./users";

export default combineReducers({
  teams,
  users
});