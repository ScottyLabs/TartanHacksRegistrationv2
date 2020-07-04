import { DispatchAction } from "../_types/dispatchAction";
import axios from "axios";

export default (store: any) => (next: any) => async (
  action: DispatchAction
): Promise<any> => {
  const { types, request } = action;

  if (!types) {
    next(action);
    return;
  }

  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every((type) => typeof type === "string")
  ) {
    throw new Error("Expected an array of three string types.");
  }

  const [requestType, successType, failureType] = types;
  const dispatch = store.dispatch;

  dispatch({ type: requestType, request });

  const url = `${process.env.REACT_APP_HTTP_BASE_URL}${request.path}`;

  const accessToken = window.localStorage.getItem("accessToken");

  const headers = {
    Authorization: "Bearer " + accessToken || "",
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
  };

  let response;
  try {
    response = await axios({
      method: request.method,
      url: url,
      data: request.body,
      headers: headers
    })
  } catch (err) {
    if (err.message === "Failed to fetch") {
      // TODO: create semantic toast
      console.log(
        "A connection to the server couldn't be made. Please try again later."
      );
      dispatch({ type: failureType, message: "CONN_REFUSED" });
      throw { type: failureType, message: "CONN_REFUSED" };
    }
  }

  if (response?.status === 200) {
    const body = response;
    dispatch({ type: successType, body });
    return Promise.resolve({ type: successType, body });
  }

  if (request.path !== "/auth/verify") {
    // TODO: create semantic toast
    console.log(response);
  }
  dispatch({ type: failureType, message: response?.statusText });
  throw { type: failureType, message: response?.statusText };
};
