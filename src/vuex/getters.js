export const isAuthenticated = (state) => {
    return state.auth.isAuthenticated;
};

export const sessionToken = (state) => {
  return state.auth.access_token;
}
