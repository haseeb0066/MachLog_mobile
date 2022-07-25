import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, View } from "react-native";
import DrawerRender from "./DrawerRender";
import TabScreen from "../BottomNavigation";
import Colors from "../../Assets/colors";
import RootStack from "../../RootStack";
import HomeScreen from "../../BottomTabScreens/HomeScreen";

const Drawer = createDrawerNavigator();

const DrawerTap = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerRender {...props} />}
      screenOptions={{
        headerMode: "none",
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.gray,
          width: "65%",
        },
      }}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />r
      {/* <Drawer.Screen name="RootStack" component={RootStack} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerTap;
