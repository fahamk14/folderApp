import { combineReducers } from "redux";
import folderListArrReducer from "./folderListArrReducer";
import positionReducer from "./positionReducer";
import forwardPathReducer from './forwardPathReducer';

const appReducer = combineReducers({
  folderListArrReducer,
  positionReducer,
  forwardPathReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;