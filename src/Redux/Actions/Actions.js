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
} from "./ActionsTypes";

export function LanguageType(data) {
  console.log("action LanguageType ==>  ", data);
  return {
    type: LANGUAGE_TYPE,
    payload: data,
  };
}

export function LoginCheck() {
  // console.log("action ==> Login true");
  return {
    type: LOGIN_REQUEST,
  };
}

export function LoginFirstTime() {
  // console.log("action ==> Login true");
  return {
    type: FIRST_TIME,
  };
}

export function logout() {
  return { type: LOGOUT_REQUEST };
}

export function UserCredentails(data) {
  // console.log("Action UserCredentails ==>  ",data);
  return {
    type: USER_CREDENTIALS,
    payload: data,
  };
}

export function userToken(data) {
  // console.log("auth action ==> ", data);
  return {
    type: USER_TOKEN,
    payload: data,
  };
}

export function userProfilePicture(data) {
  console.log(" userProfilePicture ==> ", data);
  return {
    type: PROFILE_PICTURE,
    payload: data,
  };
}

export function originLat(data) {
  // console.log(" ORIGIN_LONG ==> ", data);
  return {
    type: ORIGIN_LAT,
    payload: data,
  };
}

export function originLong(data) {
  // console.log(" ORIGIN_LONG ==> ", data);
  return {
    type: ORIGIN_LONG,
    payload: data,
  };
}

// export { userToken, Login, logout };
