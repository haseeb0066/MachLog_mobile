import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import styles from "./styles";
import Header from "../../../Components/Common/Header/Header";
import colors from "../../../Assets/Colors/Colors";
import Images from "../../../Assets/Images";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// const Tab = createMaterialTopTabNavigator();

function Today({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const layout = useWindowDimensions();

  // ================= Validation funtion with formik ==========================

  // =================  Tab Veiw  ================

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // behavior="height"
      style={styles.container}
    >
      <ImageBackground
        source={require("../../../Assets/Images/Png/BackImage.png")}
        style={{
          height: "100%",
          width: "105%",
          zIndex: 1,
          position: "absolute",
        }}
      />
      <View style={styles.headerContainer}>
        <Header
          title={"Custom"}
          leftIconPath={Images.backArrow}
          //   backSvg={<LeftArrow />}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          tintColor={colors.white}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
export default Today;
