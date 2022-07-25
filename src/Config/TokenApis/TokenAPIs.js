import axios from "axios";

const TokenAPIs = (url, apiMethod, params, token) => {
  console.log(" ====== params =====>   ", params);
  var options = {
    url,
    method: apiMethod,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: params,
  };
  try {
    return axios(options)
      .then((response) => {
        console.log("POst Token API respones", response);
        return response;
      })

      .catch((error) => {
        console.log("trys catch Error is=====> ", error.response);
        return error.response;
      });
  } catch (error) {
    console.log("catch is: ", error);
  }
};

export default TokenAPIs;
