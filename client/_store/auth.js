import axios from "axios";
import history from "../history";
import { getUsers } from "./users";

const TOKEN = "token";

//<---------- ACTION TYPES ---------->
const SET_AUTH = "SET_AUTH";

//<---------- ACTION CREATORS ---------->
const setAuth = (auth) => ({ type: SET_AUTH, auth });

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
      password,
      distUnit: "miles"  //todo will allow selectable option in future (dropdown after login?)
    });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    //repull user list if signup to update store    
    if(method === 'signup') dispatch(getUsers());
  } catch(authErr) {
    return dispatch(setAuth({ error: authErr }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login")
    return {
      type: SET_AUTH,
      auth: {}
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