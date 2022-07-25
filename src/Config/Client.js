import { create } from "apisauce";
const baseURL = "https://machlog.viltco.com/api";
import LocalStorage from "../Utills/LocalStorage/LocalStorage";
import PreferenceKeys from "../Utills/PreferenceKeys/PreferenceKeys";

const apiClient = create({
  baseURL: baseURL,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const userToken = await LocalStorage.getObjectData(PreferenceKeys.token);
  console.log("userToken ==>  ", userToken);
  request.headers["Authorization"] = `Bearer ${userToken}`;
});
export default apiClient;

// "Bearer 4|86FdTkkPVznckq8xLqhnygFvGvftG8D7kidfmmfP";
