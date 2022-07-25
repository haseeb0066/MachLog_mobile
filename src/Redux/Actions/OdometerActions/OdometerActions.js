import {
  ODOMETER_API,
  USER_ID,
  START_ODO_VALUE,
  ODOMETER_DESCRIPTION,
  WORK_TYPE,
} from "./ActionsTypes";

export function OdometerAPI(data) {
  //   console.log("action ==> ODOMETER_API ==>    ", data);
  return {
    type: ODOMETER_API,
    payload: data,
  };
}

export function UserId(data) {
  console.log("action ==> UserId ==>    ", data);
  return {
    type: USER_ID,
    payload: data,
  };
}

export function startOdoValue(data) {
  // console.log("action ==> startOdoValue ==>    ", data);
  return {
    type: START_ODO_VALUE,
    payload: data,
  };
}

export function odoDescription(data) {
  // console.log("action ==> odoDescription ==>    ", data);
  return {
    type: ODOMETER_DESCRIPTION,
    payload: data,
  };
}

export function workType(data) {
  // console.log("action ==> UserId ==>    ", data);
  data == 1 ? (data = "Work") : (data = "Personal");
  return {
    type: WORK_TYPE,
    payload: data,
  };
}
