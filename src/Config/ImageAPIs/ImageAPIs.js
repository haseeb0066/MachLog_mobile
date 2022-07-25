import axios from "axios";

const ImageAPIs = (url, apiMethod, params, token) => {
  console.log(params, " ====== params ");
  var options = {
    url,
    method: apiMethod,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      redirect: "follow",
    },
    data: params,
  };
  try {
    return axios(options)
      .then((response) => {
        console.log("API respones", response);
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

export default ImageAPIs;
