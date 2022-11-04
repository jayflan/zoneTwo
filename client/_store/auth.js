import axios from "axios";

const TOKEN = "token";

//<---------- ACTION TYPES ---------->
const SET_AUTH = "SET_AUTH";

//<---------- ACTION CREATORS ---------->
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const _logout = () => ({ type: SET_AUTH, auth: {} });

//<---------- THUNKS ---------->
  //me thunk sets the store after running authenticate thunk
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if(token) {
    const user = (await axios.get("/auth/me", {
      headers: {
        authorization: token
      }
    })).data;
    dispatch(setAuth(user));
  }
};
  //authenticate thunk ensures user is correct via token
  //method arg should be signup || login 
export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, {
      email,
      password
    });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch(authErr) {
    return dispatch(setAuth({ error: authErr }));
  }
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem(TOKEN);
    dispatch(_logout());
  };
}; 

//<---------- REDUCER ---------->
export const auth = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  };
};