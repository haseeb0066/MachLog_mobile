import { combineReducers } from "redux";
import authReducer from "./authReducer";
import odometerReducer from "./odometerReducer";

const rootReducer = combineReducers({
  authReducer,
  odometerReducer,
});

export default rootReducer;
