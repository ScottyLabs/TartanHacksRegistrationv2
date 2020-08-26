export default (token: string): void => {
  window.localStorage.setItem("accessToken", token);
};
