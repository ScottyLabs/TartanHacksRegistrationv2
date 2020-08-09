import * as actions from "../_actions";
import { Dispatch } from "redux";

const getCurrentUser = async (dispatch: Dispatch<any>, history: any) => {
  try {
    const body = {
      token: window.localStorage.getItem("accessToken")
    }
    await dispatch(actions.users.verifyToken(body));
  } catch {
    history.push("/login");
  }
};

export default getCurrentUser;