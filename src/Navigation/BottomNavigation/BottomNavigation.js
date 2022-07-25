import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
// import { useSelector, useDispatch } from "react-redux";

// =======================local import=========================

import HomeScreen from "../../Screens/BottomTabScreens/HomeScreen/HomeScreen";
import OdometerScreen from "../../Screens/BottomTabScreens/OdometerScreen/OdometerScreen";
import ProfileScreen from "../../Screens/BottomTabScreens/ProfileScreen/ProfileScreen";
import StatsScreen from "../../Screens/BottomTabScreens/StatsScreen/StatsScreen";
import SupportScreen from "../../Screens/BottomTabScreens/SupportScreen/SupportScreen";
import SubcriptionPackages from "../../Screens/BottomTabScreens/SubcriptionPackages/SubcriptionPackages";

//==============================================================

// ===================SVGS====================

import Home from "../../Assets/Images/Svg/house.svg";
import Stats from "../../Assets/Images/Svg/Stats.svg";
import Block from "../../Assets/Images/Svg/blocks.svg";
import Support from "../../Assets/Images/Svg/Support.svg";
import Profile from "../../Assets/Images/Svg/Profile.svg";
import OdoMeter from "../../Assets/Images/Svg/OdoMetter.svg";

import Oval from "../../Assets/Images/Svg/Oval.svg";
import colors from "../../Assets/Colors/Colors";
import { useTranslation } from "react-i18next";

//=================================================

const Tab = createBottomTabNavigator();

const height_screen = Dimensions.get("window").height;

const BottomNavigation = () => {
  const { t } = useTranslation();

  const getTranslatedText = (text) => {
    // console.log("Translated text", t(text));r
    return t(text);
  };
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      tabBarOptions={{
        showLabel: false,
        // keyboardHidesTabBar: true,
        style: {
          position: "absolute",
          bottom: hp(3),
          backgroundColor: colors.bottomBgColor,
          height: hp(8),
          height: Platform.OS === "ios" ? hp(8) : hp(9),
          left: 20,
          right: 20,
          borderRadius: hp(2),
          justifyContent: "center",
        },
      }}
    >
      <Tab.Screen
        name={getTranslatedText("STATS")}
        component={StatsScreen}
        options={{
          // tabBarLabel: "sad",
          // tabBarButton: ({focused}) => {borderTopColor: 'red', borderTopWidth: 2}
          tabBarIcon: ({ focused }) => {
            //dispatch(GetTabLocation('Call'));
            return focused ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  top: Platform.OS === "ios" ? hp(2) : hp(0),
                }}
              >
                <Stats
                  resizeMode="contain"
                  style={{
                    height: hp(5),
                    width: wp(5),

                    marginBottom: hp(0.3),
                  }}
                />
                <Text
                  style={{
                    color: "blue",
                    fontSize: hp(1.3),
                    fontWeight: "600",
                  }}
                >
                  {getTranslatedText("STATS")}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  top: Platform.OS === "ios" ? hp(2) : hp(0),
                }}
              >
                <Stats
                  resizeMode="contain"
                  style={{
                    height: hp(10),
                    width: wp(10),

                    marginBottom: hp(0.3),
                  }}
                />
                <Text
                  style={{
                    // color: colors.bottomBarText,
                    fontSize: hp(1.3),
                    fontWeight: "600",
                    color: colors.bottomBarText,
                  }}
                >
                  {getTranslatedText("STATS")}
                </Text>
              </View>
            );
          },

          tabBarItemStyle: {
            borderRadius: 10,
            // width: wp('1%'),
            alignSelf: "center",
            height: hp("5%"),
            borderWidth: 1,
            justifyContent: "center",
          },
        }}
      />
      <Tab.Screen
        name={getTranslatedText("Support")}
        component={SupportScreen}
        options={{
          // tabBarActiveTintColor: "white",
          tabBarIcon: ({ focused }) => {
            // return focused ? <Graph /> : <Graph />;
            return focused ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  top: Platform.OS === "ios" ? hp(2) : hp(0),
                }}
              >
                <Support
                  resizeMode="contain"
                  style={{
                    height: hp(5),
                    width: wp(5),

                    marginBottom: hp(0.3),
                  }}
                />
                <Text
                  style={{
                    color: colors.bottomBarText,
                    fontSize: hp(1.3),
                    fontWeight: "600",
                    color: "blue",
                  }}
                >
                  {getTranslatedText("Support")}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  top: Platform.OS === "ios" ? hp(2) : hp(0),
                }}
              >
                <Support
                  resizeMode="contain"
                  style={{
                    height: hp(10),
                    width: wp(10),
                    // tintColor: focused ? "green" : "blue",
                    marginBottom: hp(0.3),
                  }}
                />
                <Text
                  style={{
                    color: colors.bottomBarText,
                    fontSize: hp(1.3),
                    fontWeight: "600",
                    color: colors.bottomBarText,
                  }}
                >
                  {getTranslatedText("Support")}
                </Text>
              </View>
            );
          },
          tabBarItemStyle: {
            borderRadius: 15,
            height: hp("7%"),
            // borderWidth: 1,

            alignSelf: "center",
            alignItems: "center",
            alignContent: "center",
          },
        }}
      />
      <Tab.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: "orange",
          tabBarIcon: ({ focused }) => {
            // return focused ? <Graph /> : <Graph />;
            return focused ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  height: Platform.OS === "ios" ? hp(9) : hp(10),
                  width: wp(20),
                  marginBottom: Platform.OS === "ios" ? hp(4) : hp(8),
                  backgroundColor: colors.bottomBgColor,
                  borderRadius: Platform.OS === "ios" ? hp(6) : hp(6),
                }}
              >
                <View
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    alignItems: "center",
                    // borderWidth: 1,
                    // backgroundColor: "",
                  }}
                >
                  <Home alignSelf="center" />
                </View>
                <View>
                  <Oval alignSelf="center" />
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  height: Platform.OS === "ios" ? hp(9) : hp(10),
                  width: wp(20),
                  marginBottom: Platform.OS === "ios" ? hp(4) : hp(8),
                  backgroundColor: colors.bottomBgColor,
                  borderRadius: Platform.OS === "ios" ? hp(6) : hp(6),
                }}
              >
                <View
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    alignItems: "center",
                    // borderWidth: 1,
                    backgroundColor: "",
                  }}
                >
                  <Home alignSelf="center" />
                </View>
                <View>
                  <Oval alignSelf="center" />
                </View>
              </View>
            );
          },

          tabBarItemStyle: {
            marginBottom:
              Platform.OS === "ios"
                ? height_screen < 675
                  ? hp(6)
                  : height_screen == 736
                  ? hp(3)
                  : hp(3)
                : hp(3),
          },
        }}
      />
      <Tab.Screen
        name={getTranslatedText("subcription")}
        component={SubcriptionPackages}
        options={{
          // tabBarActiveTintColor: "white",
          tabBarIcon: ({ focused }) => {
            // return focused ? <OdoMeter /> : <OdoMeter />;
            return focused ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  top: Platform.OS === "ios" ? hp(2) : hp(0),
                }}
              >
                <OdoMeter
                  resizeMode="contain"
                  style={{
                    height: hp(5),
                    width: wp(5),

                    marginBottom: hp(0.3),
                  }}
                />
                <Text
                  style={{
                    color: colors.bottomBarText,
                    fontSize: hp(1.3),
                    fontWeight: "600",
                    color: "blue",
                  }}
                >
                  {getTranslatedText("subcription")}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  top: Platform.OS === "ios" ? hp(2) : hp(0),
                }}
              >
                <OdoMeter
                  resizeMode="contain"
                  style={{
                    height: hp(10),
                    width: wp(10),

                    marginBottom: hp(0.3),
                  }}
                />
                <Text
                  style={{
                    color: colors.bottomBarText,
                    fontSize: hp(1.3),
                    fontWeight: "600",
                    color: colors.bottomBarText,
                  }}
                >
                  {getTranslatedText("subcription")}
                </Text>
              </View>
            );
          },

          tabBarItemStyle: {
            borderRadius: 15,
            height: hp("7%"),
            alignSelf: "center",
            alignItems: "center",
            alignContent: "center",
          },
        }}
      />
      <Tab.Screen
        name={getTranslatedText("Profile")}
        component={ProfileScreen}
        options={{
          // tabBarVisible: false,
          tabBarIcon: ({ focused }) => {
            // return focused ? <Profile /> : <Profile />;
            return focused ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  top: Platform.OS === "ios" ? hp(2) : hp(0),
                }}
              >
                <Profile
                  resizeMode="contain"
                  style={{
                    height: hp(5),
                    width: wp(5),

                    marginBottom: hp(0.3),
                  }}
                />
                <Text
                  style={{
                    color: colors.bottomBarText,
                    fontSize: hp(1.3),
                    fontWeight: "600",
                    color: "blue",
                  }}
                >
                  {getTranslatedText("Profile")}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // borderWidth: 1,
                  top: Platform.OS === "ios" ? hp(2) : hp(0),
                }}
              >
                <Profile
                  resizeMode="contain"
                  style={{
                    height: hp(10),
                    width: wp(10),
                    marginBottom: hp(0.3),
                  }}
                />
                <Text
                  style={{
                    color: colors.bottomBarText,
                    fontSize: hp(1.3),
                    fontWeight: "600",
                    color: colors.bottomBarText,
                  }}
                >
                  {getTranslatedText("Profile")}
                </Text>
              </View>
            );
          },
          tabBarItemStyle: {
            borderRadius: 15,
            height: hp("7%"),
            alignSelf: "center",
          },
          // tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  iconStyle: {
    width: wp("5%"),
    height: hp("3%"),
  },
});
