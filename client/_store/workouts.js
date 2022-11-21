import axios from 'axios';

//---------- ACTION TYPES ----------//

const GET_USER_WORKOUTS = "GET_USER_WORKOUTS";

//---------- ACTION CREATORS ----------//

const _getUserWorkouts = (userWorkouts) => {
  return {
    type: GET_USER_WORKOUTS,
    userWorkouts
  }
}

//---------- THUNKS ----------//

export const getUserWorkouts = (auth) => {
  return async(dispatch) => {
    const userId = auth;
    const userWorkouts = (await axios.get(`/api/workouts/${userId}`)).data;
    dispatch(_getUserWorkouts(userWorkouts));
  }
}

//---------- REDUCER ----------//

export const userWorkouts = (state = [], action) => {
  switch(action.type) {
    case GET_USER_WORKOUTS:
      return action.userWorkouts
    default: 
      return state
  };
}