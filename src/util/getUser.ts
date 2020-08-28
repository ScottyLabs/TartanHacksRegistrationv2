import * as actions from "../_actions";
import { Dispatch } from "redux";

export const getUserFromState = (state: any): any => {
  const userState = state?.users || state;
  return userState?.data?.data?.user;
}

export const getCurrentUser = async (dispatch: Dispatch<any>) => {
  let accessToken = window.localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const body = {
        token: accessToken,
      };
      await dispatch(actions.users.verifyToken(body));
    } catch {}
  }
};
