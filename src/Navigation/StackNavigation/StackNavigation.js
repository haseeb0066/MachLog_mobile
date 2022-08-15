import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../../Screens/Splash/Splash";
import Login from "../../Screens/AuthScreens/Login/Login";
import Signup from "../../Screens/AuthScreens/Signup/Signup";
import SignupOtp from "../../Screens/AuthScreens/SignupOtp/SignupOtp";
import ForgotPassword from "../../Screens/AuthScreens/ForgotPassword/ForgotPassword";
import ResetPassword from "../../Screens/AuthScreens/ResetPassword/ResetPassword";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import { useSelector, useDispatch } from "react-redux";
import ForgotPassOtp from "../../Screens/AuthScreens/ForgotPassOtp/ForgotPassOtp";
import OdometerScreen from "../../Screens/BottomTabScreens/OdometerScreen/OdometerScreen";
import HomeScreen from "../../Screens/BottomTabScreens/HomeScreen/HomeScreen";
import Messages from "../../Screens/BottomTabScreens/Messages/Messages";
import ShowMessage from "../../Screens/BottomTabScreens/ShowMessage/ShowMessage";
import ApprovalPending from "../../Screens/AuthScreens/ApprovalPending/ApprovalPending";
import SupportScreen from "../../Screens/BottomTabScreens/SupportScreen/SupportScreen";
import AuthSupportScreen from "../../Screens/AuthScreens/AuthSupportScreen/AuthSupportScreen";
import { changeLanguage } from "i18next";
import VehicleInfo from "../../Screens/BottomTabScreens/VehicleInfo/VehicleInfo";
import CompanyInfo from "../../Screens/AuthScreens/CompanyInfo/CompanyInfo";
import OneStepSignup from "../../Screens/AuthScreens/OneStepSignup/OneStepSignup";
import Subcription from "../../Screens/AuthScreens/Subcription/Subcription";
import MonthlyDetail from "../../Screens/BottomTabScreens/MonthlyDetail/MonthlyDetail";
import PackageHistory from "../../Screens/BottomTabScreens/PackageHistory/PackageHistory";

const Stack = createStackNavigator();

const StackNavigation = () => {
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const firstTime = useSelector((state) => state.authReducer.firstTime);
  const CurrentLanguage = useSelector(
    (state) => state.authReducer.CurrentLanguage
  );
  const [LoginState, setLoginState] = useState("");
  const [LanguageIs, setLanguageIs] = useState("");

  useEffect(() => {
    console.log("Stack file useEffect running");
    console.log("firstTime===  ", firstTime);
  }, [isLogin]);

  useEffect(() => {
    console.log("Stack file  LanguageType ===  ", CurrentLanguage);
    setLanguageIs(LanguageIs);
    changeLanguage(CurrentLanguage);
  }, [CurrentLanguage]);

  const AfterLoginAppContainer = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          // initialRouteName={"Splash"}
        >
          <Stack.Screen
            name={"BottomNavigation"}
            component={BottomNavigation}
          />
          <Stack.Screen name={"OdometerScreen"} component={OdometerScreen} />
          {/* <Stack.Screen
            name={getTranslatedText("Home")}
            component={HomeScreen}
          /> */}
          <Stack.Screen name={"VehicleInfo"} component={VehicleInfo} />
          <Stack.Screen name={"Messages"} component={Messages} />
          <Stack.Screen name={"ShowMessage"} component={ShowMessage} />
          <Stack.Screen name={"MonthlyDetail"} component={MonthlyDetail} />
          <Stack.Screen name={"PackageHistory"} component={PackageHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  const BeforeLoginAppContainer = () => {
    return (
      <NavigationContainer>
        {firstTime == false ? (
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"Splash"}
          >
            <Stack.Screen name={"Splash"} component={Splash} />
            <Stack.Screen name={"Login"} component={Login} />
            <Stack.Screen name={"Signup"} component={Signup} />
            <Stack.Screen name={"SignupOtp"} component={SignupOtp} />
            <Stack.Screen name={"OneStepSignup"} component={OneStepSignup} />
            <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
            <Stack.Screen name={"ResetPassword"} component={ResetPassword} />
            <Stack.Screen name={"ForgotPassOtp"} component={ForgotPassOtp} />
            <Stack.Screen
              name={"ApprovalPending"}
              component={ApprovalPending}
            />
            <Stack.Screen
              name={"AuthSupportScreen"}
              component={AuthSupportScreen}
            />
            <Stack.Screen name={"Subcription"} component={Subcription} />
            {/* BOTTOM TAP */}
            {/* <Stack.Screen name={"BottomNavigation"} component={BottomNavigation} /> */}
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"Login"}
          >
            <Stack.Screen name={"Subcription"} component={Subcription} />

            <Stack.Screen name={"Login"} component={Login} />
            <Stack.Screen name={"Signup"} component={Signup} />
            <Stack.Screen name={"SignupOtp"} component={SignupOtp} />
            <Stack.Screen name={"OneStepSignup"} component={OneStepSignup} />
            <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
            <Stack.Screen name={"ResetPassword"} component={ResetPassword} />
            <Stack.Screen name={"ForgotPassOtp"} component={ForgotPassOtp} />
            {/* <Stack.Screen name={"VehicleInfo"} component={VehicleInfo} /> */}
            <Stack.Screen
              name={"ApprovalPending"}
              component={ApprovalPending}
            />
            <Stack.Screen
              name={"AuthSupportScreen"}
              component={AuthSupportScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  };

  // const BeforeLoginAppContainer = () => {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator
  //         screenOptions={{ headerShown: false }}
  //         initialRouteName={"Splash"}
  //       >
  //         <Stack.Screen name={"Splash"} component={Splash} />
  //         <Stack.Screen name={"Login"} component={Login} />
  //         <Stack.Screen name={"Signup"} component={Signup} />
  //         <Stack.Screen name={"SignupOtp"} component={SignupOtp} />
  //         <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
  //         <Stack.Screen name={"ResetPassword"} component={ResetPassword} />
  //         <Stack.Screen name={"ForgotPassOtp"} component={ForgotPassOtp} />

  //         {/* BOTTOM TAP */}
  //         {/* <Stack.Screen name={"BottomNavigation"} component={BottomNavigation} /> */}
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // };

  if (isLogin == false) {
    return <BeforeLoginAppContainer />;
  } else {
    return <AfterLoginAppContainer />;
  }
};

export default StackNavigation;
