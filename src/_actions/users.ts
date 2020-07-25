import { DispatchAction } from "../_types/dispatchAction";

interface authBody {
  email: string;
  password: string;
}

interface verifyBody {
  token: string | null;
}

const login = (body: authBody): DispatchAction => ({
  types: ["LOGIN_REQUEST", "LOGIN_SUCCESS", "LOGIN_ERROR"],
  request: {
    path: "/auth/login",
    method: "POST",
    body,
  },
});

const register = (body: authBody): DispatchAction => ({
  types: ["REGISTER_REQUEST", "REGISTER_SUCCESS", "REGISTER_ERROR"],
  request: {
    path: "/auth/register",
    method: "POST",
    body,
  },
});

const verifyToken = (body: verifyBody): DispatchAction => ({
  types: ["VERIFY_TOKEN_REQUEST", "VERIFY_TOKEN_SUCCESS", "VERIFY_TOKEN_ERROR"],
  request: {
    path: "/auth/login",
    method: "POST",
    body
  },
});

export default {
  login,
  register,
  verifyToken
};
