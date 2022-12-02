import axios from 'axios';

//---------- ACTION TYPES ----------//

const GET_SINGLE_WORKOUT = "GET_SINGLE_WORKOUT";

//---------- ACTION CREATORS ----------//

const _getSingleWorkout = (singleWorkout) => {
  return {
    type: GET_SINGLE_WORKOUT,
    singleWorkout
  }
}

//---------- THUNKS ----------//

export const getSingleWorkout = (workoutId) => {
  return async(dispatch) => {
    //authenticate user token
    const token = window.localStorage.getItem('token');
    const user = (await axios.get(`/auth/me`, {
      headers: {
        authorization: token
      }
    })).data;
    //get a single user workout
    const userId = user.id;
    if(!userId) {
      dispatch(_getSingleWorkout({error: "error"}));
    } else {
      const singleWorkout = (await axios.get(`/api/workouts/user/${workoutId}`)).data;
      dispatch(_getSingleWorkout(singleWorkout));
    }

  }
}

//---------- REDUCER ----------//

export const singleWorkout = (state = [], action) => {
  switch(action.type) {
    case GET_SINGLE_WORKOUT:
      return action.singleWorkout
    default: 
      return state
  };
}