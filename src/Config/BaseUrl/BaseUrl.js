export const BASE_URL = "https://machlog.viltco.com/api";

const EndPoints = {
  SignUp: BASE_URL + "/user/add",
  otpVerification: BASE_URL + "/user/verify-otp",
  resendOtp: BASE_URL + "/user/get-new-otp",
  LoginAPI: BASE_URL + "/user/login",
  ForgotRequest: BASE_URL + "/user/forgot-password-request",
  ForgotReqOtp: BASE_URL + "/user/forgot-password-otp-submit",
  ResetPassword: BASE_URL + "/user/forgot-password-submit",
  OdometerStart: BASE_URL + "/odometer/start",
  HomeAPI: BASE_URL + "/odometer/stats-detail-get",
  OdometerEnd: BASE_URL + "/odometer/end",
  SubscribeGet: BASE_URL + "/subscription/list",
  getMessagesList: BASE_URL + "/messages/get-all-messages",
  postSelectedMsg: BASE_URL + "/messages/messages-viewed",
  selectPackageAPI: BASE_URL + "/subscription/user-subscribed-packages",
  checkUserPackage: BASE_URL + "/odometer/check-subscription-packg",
  LogoutUser: BASE_URL + "/user/logout",
  NewRegisterApi: BASE_URL + "/user/add",
  VerifyOTPs: BASE_URL + "/user/verify-otp",
};

export default EndPoints;
