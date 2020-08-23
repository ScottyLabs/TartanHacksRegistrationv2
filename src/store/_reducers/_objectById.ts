import { StoreActionPayload } from "../../_types/storeAction";

export default (state: any, array: StoreActionPayload[]) => {
  const arrayToReturn = array.slice();
  const objectToReturn: {
    [key: string]: {};
  } = {
    ...state,
  };

  arrayToReturn.forEach((element) => {
    objectToReturn[element._id] = element;
  });

  return objectToReturn;
};
