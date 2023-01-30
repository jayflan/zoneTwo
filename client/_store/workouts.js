import axios from 'axios';

//---------- ACTION TYPES ----------//

const GET_USER_WORKOUTS = "GET_USER_WORKOUTS";
const ADD_USER_WORKOUT = "POST_USER_WORKOUT"; 

//---------- ACTION CREATORS ----------//

const _getUserWorkouts = (userWorkouts) => {
  return {
    type: GET_USER_WORKOUTS,
    userWorkouts
  }
}

const _addUserWorkout = (userWorkout) => {
  return {
    type: ADD_USER_WORKOUT,
    userWorkout
  }
}

//---------- THUNKS ----------//

export const getUserWorkouts = (auth) => {
  return async(dispatch) => {
    //authenticate user token
    const token = window.localStorage.getItem('token');
    const user = (await axios.get(`/auth/me`, {
      headers: {
        authorization: token
      }
    })).data;
    //get all user workouts
    const userId = user.id;
    if(!userId) {
      dispatch(_getUserWorkouts({error: "error"}))
    } else {
      const userWorkouts = (await axios.get(`/api/workouts/${userId}`)).data;
      dispatch(_getUserWorkouts(userWorkouts));
    }
  }
}

export const addUserWorkout = (fileName, selectedFile) => {
  
  return async(dispatch) => {
    //authenticate user token
    const token = window.localStorage.getItem('token');
    
    const user = (await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })).data;

    //post new workout to user
    const userId = user.id;

    if(!userId) {
      dispatch(_addUserWorkout({error: "error"}));
    } else {
        //read & prep file for upload
      const reader = new FileReader();
        //Todo check that file is indeed gpx/xml and throw error if NOT
        //Todo ex. reader.readAsDataURL(selectedFile) <-- to change file into string
      reader.readAsBinaryString(selectedFile);

      reader.onload = async () => {
        const file = reader.result;
        //make POST inside 'reader.onload' to capture reader result
        const formData = {fileName: fileName, fileData: file};
        const userWorkout = (await axios.post(`api/workouts/upload/user/${userId}`, formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )).data;

        dispatch(_addUserWorkout(userWorkout));
      
      }
              
      
    }
  }  
}
//---------- REDUCER ----------//

export const userWorkouts = (state = [], action) => {
  switch(action.type) {
    case GET_USER_WORKOUTS:
      return action.userWorkouts
    case ADD_USER_WORKOUT:
      return [...state, action.userWorkout]
    default: 
      return state
  };
}