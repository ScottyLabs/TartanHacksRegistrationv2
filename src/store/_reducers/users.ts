import { combineReducers } from 'redux';
import { StoreAction, StoreActionPayload } from '../../_types/storeAction';
import objectById from "./_objectById";
import replaceElementinState from "./_replaceElementinState";

const data = (state = {}, action: StoreAction) => {
  switch (action.type) {
    case "VERIFY_TOKEN_SUCCESS":
      return action.body;
    case "VERIFY_TOKEN_ERROR":
      return {};
    default:
      return state;
  }
}

const didInvalidate = (state = true, action: StoreAction) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "VERIFY_TOKEN_ERROR":
      return true;
    case "VERIFY_TOKEN_SUCCESS":
      return false;
    default:
      return state;
  }
}

const isFetching = (state = true, action: StoreAction) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return true;
    case "LOGIN_SUCCESS":
      return false;
    default:
      return state;
  }
}

export default {
  data,
  didInvalidate,
  isFetching
}