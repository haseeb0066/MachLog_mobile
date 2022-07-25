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

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Custom from "../../Screens/BottomTabScreens/TopTabScreens/Custom";
import Monthly from "../../Screens/BottomTabScreens/TopTabScreens/Monthly";
import Today from "../../Screens/BottomTabScreens/TopTabScreens/Today";
import Weekly from "../../Screens/BottomTabScreens/TopTabScreens/Weekly";

const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Custom" component={Custom} />
      <Tab.Screen name="Monthly" component={Monthly} />
      <Tab.Screen name="Today" component={Today} />
      <Tab.Screen name="Weekly" component={Weekly} />
    </Tab.Navigator>
  );
}
export default TopTabNavigation;
