import { authReducer } from "../Reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import rootReducer from "./Reducers/index";
import rootReducer from "../Reducers";

import ReduxThunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
let persistor = persistStore(store);
export { store, persistor };
