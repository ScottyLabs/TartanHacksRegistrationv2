import { DispatchAction } from "../_types/dispatchAction";

interface authBody {
  email: string;
  password: string;
}

interface verifyBody {
  token: string | null;
}

interface resetEmailBody {
  email: string | null;
}

interface resetBody {
  token: string | null;
  password: string | null;
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

const verifyEmail = (body: verifyBody): DispatchAction => ({
  types: ["VERIFY_EMAIL_REQUEST", "VERIFY_EMAIL_SUCCESS", "VERIFY_EMAIL_ERROR"],
  request: {
    path: "/auth/verify/" + body.token,
    method: "GET"
  }
});

const resetPasswordEmail = (body: resetEmailBody) => ({
  types: ["RESET_EMAIL_REQUEST", "RESET_EMAIL_SUCCESS", "RESET_EMAIL_ERROR"],
  request: {
    path: "/auth/reset",
    method: "POST",
    body
  }
});

const resetPassword = (body: resetBody) => ({
  types: ["RESET_PASSWORD_REQUEST", "RESET_PASSWORD_SUCCESS", "RESET_PASSWORD_ERROR"],
  request: {
    path: "/auth/reset/password",
    method: "POST",
    body
  }
});

export default {
  login,
  register,
  verifyToken,
  verifyEmail,
  resetPasswordEmail,
  resetPassword
};
