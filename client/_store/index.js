import { configureStore } from "@reduxjs/toolkit";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger, createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { users } from "./users";
import { auth } from "./auth";
import { userWorkouts } from "./workouts";

const reducer = combineReducers({
  users,
  auth,
  userWorkouts
});

const myLogger = createLogger({collapsed: true}); 
const myMiddleware = [thunkMiddleware]
  
  if(process.env.NODE_ENV === 'development') {
    myMiddleware.push(myLogger)
  }

const store = configureStore({
  reducer: reducer,
  middleware: myMiddleware
});

export default store;
export * from "./users";
export * from "./auth";
export * from "./workouts";

