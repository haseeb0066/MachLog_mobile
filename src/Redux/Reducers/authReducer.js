import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  USER_CREDENTIALS,
  USER_TOKEN,
  FIRST_TIME,
  PROFILE_PICTURE,
  LANGUAGE_TYPE,
  ORIGIN_LAT,
  ORIGIN_LONG,
} from "../Actions/ActionsTypes";

const INITIAL_STATE = {
  id: "",
  name: "",
  email: "",
  mobile: "",
  token: "",
  isLogin: false,
  resetPassToken: "",
  userAllData: {},
  firstTime: false,
  profilePIcture: "",
  CurrentLanguage: "Eng",
  originLatState: "",
  originLongState: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      // console.log("reducer ==> Login true");
      return {
        ...state,
        isLogin: true,
      };

    case LANGUAGE_TYPE:
      console.log("reducer ==> LANGUAGE_TYPE", action.payload);
      return {
        ...state,
        CurrentLanguage: action.payload,
      };

    case FIRST_TIME:
      // console.log("reducer ==> Login true");
      return {
        ...state,
        firstTime: true,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLogin: false,
      };

    case USER_CREDENTIALS:
      // console.log("Email reducer ==>", action.payload.name);
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        mobile: action.payload.mobile,
      };

    case USER_TOKEN:
      // console.log("auth reducer ==> ", action.payload);
      return {
        ...state,
        token: action.payload,
      };

    case ORIGIN_LAT:
      console.log("ORIGIN_LAT reducer ==> ", action.payload);
      return {
        ...state,
        originLatState: action.payload,
      };

    case ORIGIN_LONG:
      console.log("ORIGIN_LONG reducer ==> ", action.payload);
      return {
        ...state,
        originLongState: action.payload,
      };

    case PROFILE_PICTURE:
      // console.log(" PROFILE_PICTURE ==> ", action.payload);
      return {
        ...state,
        profilePIcture: action.payload,
      };

    default:
      return state;
  }
};
