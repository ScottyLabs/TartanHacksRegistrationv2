import _ from "lodash";
import { StoreActionPayload } from "../../_types/storeAction";

export default (state: { [key: string]: {} }, payload: StoreActionPayload) => {
  const newState = Object.assign({}, state);

  if (Array.isArray(payload)) {
    const arrayToReturn = payload.filter((e) => e);

    arrayToReturn.forEach((element) => {
      newState[element._id] = element;
    });
  } else if (_.isObject(payload)) {
    newState[payload._id] = payload;
  }

  return newState;
};
