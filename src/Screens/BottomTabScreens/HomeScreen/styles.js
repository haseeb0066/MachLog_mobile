import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    height: Platform.OS === "ios" ? hp(10) : hp(10),
    // zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
    // justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  watchContainer: {
    height: hp(20),
    // borderWidth: 2,
    borderColor: colors.white,
  },

  DetailContainer: {
    height: hp(50),
    // borderWidth: 2,
    borderColor: colors.white,
  },
});

export default styles;
