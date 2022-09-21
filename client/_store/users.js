import axios from "axios";

//---------- ACTION TYPES ----------//

const GET_USERS = "GET_USERS";

//---------- ACTION CREATORS ----------//

const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users
  }
};

//---------- THUNKS ----------//

export const getUsers = () => {
  return async(dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(_getUsers(users));
  }
};

//---------- REDUCER ----------//

export const users = (state = ['Test'], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default: 
      return state
  };
};

