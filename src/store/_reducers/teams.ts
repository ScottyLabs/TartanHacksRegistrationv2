import { combineReducers } from "redux";
import { StoreAction, StoreActionPayload } from "../../_types/storeAction";
import objectById from "./_objectById";
import replaceElementinState from "./_replaceElementinState";

const data = (state = {}, action: StoreAction) => {
  switch (action.type) {
    case "GET_TEAMS_SUCCESS":
      return objectById(state, action.body as StoreActionPayload[]);
    case "GET_TEAM_SUCCESS":
    case "GET_TEAM_INVITATIONS_SUCCESS":
      return replaceElementinState(state, action.body as StoreActionPayload);
    case "VERIFY_TOKEN_ERROR":
      return {};
    default:
      return state;
  }
};

const didInvalidate = (state = true, action: StoreAction): boolean => {
  switch (action.type) {
    case "CREATE_TEAM_SUCCESS":
    case "UPDATE_TEAM_SUCCESS":
    case "DELETE_TEAM_SUCCESS":
    case "VERIFY_TOKEN_ERROR":
      return true;
    case "GET_TEAM_SUCCESS":
    case "GET_TEAMS_SUCCESS":
    case "GET_TEAM_INVITATIONS_SUCCESS":
      return false;
    default:
      return state;
  }
};

const isFetching = (state = false, action: StoreAction): boolean => {
  switch (action.type) {
    case "GET_TEAMS_REQUEST":
    case "GET_TEAM_REQUEST":
    case "GET_TEAM_INVITATIONS_REQUEST":
      return true;
    case "GET_TEAMS_SUCCESS":
    case "GET_TEAMS_ERROR":
    case "GET_TEAM_SUCCESS":
    case "GET_TEAM_ERROR":
    case "GET_TEAM_INVITATIONS_SUCCESS":
    case "GET_TEAM_INVITATIONS_ERROR":
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  didInvalidate,
  isFetching,
});
