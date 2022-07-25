import {
  ODOMETER_API,
  USER_ID,
  START_ODO_VALUE,
  ODOMETER_DESCRIPTION,
  WORK_TYPE,
} from "../Actions/OdometerActions/ActionsTypes";

const INITIAL_STATE = {
  odmeterArray: [],
  user_id: "",
  ride_type: "",
  start_odometer_Value: "",
  description: "",
  start_data_time: "",
  //   ========================= End ===============
  end_date_time: "",
  end_odometer_Value: "",
  end_reading: "",
  total_kilometers: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ODOMETER_API:
      // console.log("reducer ==> Login true", action.payload);
      return {
        ...state,
        odmeterArray: action.payload,
      };
    //  ==========================  START Reading  ====================

    case USER_ID:
      console.log("reducer ==> USER_ID", action.payload);
      return {
        ...state,
        user_id: action.payload,
      };

    case START_ODO_VALUE:
      // console.log("reducer ==> USER_ID", action.payload);
      return {
        ...state,
        odmeterArray: action.payload,
      };

    case ODOMETER_DESCRIPTION:
      // console.log("reducer ==> USER_ID", action.payload);
      return {
        ...state,
        odmeterArray: action.payload,
      };

    case WORK_TYPE:
      // console.log("reducer ==> USER_ID", action.payload);
      return {
        ...state,
        odmeterArray: action.payload,
      };

    //  ==========================  END Reading  ======================

    default:
      return state;
  }
};
